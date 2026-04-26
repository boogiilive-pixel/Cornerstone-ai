import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`[SERVER] ${req.method} ${req.url}`);
    next();
  });

  // Test Route
  app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working" });
  });

  // Debug route for /api/chat
  app.all("/api/chat", (req, res, next) => {
    if (req.method === "POST") {
      return next();
    }
    console.warn(`[SERVER] Warning: Received ${req.method} request on /api/chat. Expected POST.`);
    res.status(405).json({ 
      error: "Method Not Allowed", 
      message: `Би чатбот руу POST хүсэлт хүлээж байсан боловч ${req.method} ирлээ.` 
    });
  });

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    console.log("[SERVER] Incoming POST request to /api/chat");
    const { messages } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.APP_GEMINI_KEY || 
                   process.env.API_KEY;
    console.log(`[SERVER] API Key present: ${!!apiKey}`);
    const isMissing = !apiKey || 
                      apiKey === "MY_GEMINI_API_KEY" || 
                      apiKey === "YOUR_API_KEY_HERE" || 
                      apiKey.trim() === "" || 
                      apiKey === "undefined";

    if (isMissing) {
      console.warn("[SERVER] API Key is missing or invalid.");
      const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;
      
      console.error(`[AUTH_ERROR] API Key is missing (Gemini/Google).`);
      
      return res.status(500).json({ 
        error: "GEMINI_API_KEY_MISSING",
        details: isVercel 
          ? "Vercel Dashboard -> Settings -> Environment Variables хэсэгт 'GOOGLE_API_KEY' нэртэйгээр түлхүүрээ нэмээд REDEPLOY хийнэ үү." 
          : "Баруун дээд буланд байх 'Settings' (арааны зураг) -> 'Secrets' таб дотор 'GOOGLE_API_KEY' (эсвэл 'APP_GEMINI_KEY') нэрээр түлхүүрээ нэмээд Save хийнэ үү."
      });
    }

    try {
      console.log("[SERVER] Initializing Gemini model...");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      // ... rest of code

      const tools: any = [
        {
          functionDeclarations: [
            {
              name: "sendLeadInformation",
              description: "Sends user contact information (lead) to Cornerstone AI team.",
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  name: { type: SchemaType.STRING, description: "User's full name" },
                  phone: { type: SchemaType.STRING, description: "User's phone number" },
                  email: { type: SchemaType.STRING, description: "User's email address" },
                  message: { type: SchemaType.STRING, description: "Brief description of the request" }
                },
                required: ["name", "phone", "email", "message"]
              }
            }
          ]
        }
      ];

      // Format history
      const history = messages
        .filter((m: any, i: number) => i !== 0) // Skip initial greeting
        .slice(0, -1)
        .map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const lastMessage = messages[messages.length - 1].text;

      const chat = model.startChat({
        history,
        tools,
        systemInstruction: {
          role: "system",
          parts: [{
            text: `
          Та бол Cornerstone AI компанийн мэргэжлийн AI агент "Гоо" юм. 
          
          ХАРИЛЦААНЫ ДҮРЭМ:
          1. Зөвхөн Cornerstone AI компани, түүний үйлчилгээ, төслүүдтэй холбоотой асуултанд хариулна.
          2. Хэрэв хэрэглэгч компанитай холбоогүй зүйл асуувал: "Уучлаарай, би зөвхөн Cornerstone AI компани болон манай үйлчилгээтэй холбоотой мэдээлэл өгөх боломжтой." гэж хариулна.
          3. Хариулт нь товч бөгөөд тодорхой байна.
          
          ХЭРЭГЛЭГЧИЙН МЭДЭЭЛЭЛ ЦУГЛУУЛАХ:
          - Хэрэв хэрэглэгч ажил хийлгэх сонирхолтой байвал та заавал тэдний Нэр, Утас, Имэйлийг асууж авна.
          - Мэдээллийг авсны дараа "sendLeadInformation" функцийг ашиглан мэдээллийг баг руу илгээнэ.

          Cornerstone AI Үйлчилгээнүүд:
          - AI автоматжуулалт, Вэб хөгжүүлэлт, Мобайл апп, Бизнес аналитик.
        `}]
        },
      });

      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      
      const functionCalls = response.functionCalls();
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        return res.json({ 
          functionCall: {
            name: call.name,
            args: call.args
          }
        });
      }

      res.json({ text: response.text() });
    } catch (err: any) {
      console.error("Gemini Server Error:", err);
      res.status(500).json({ error: "AI боловсруулалт хийхэд алдаа гарлаа." });
    }
  });

  // API Route for sending emails via Resend
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!resend) {
      const errorMsg = "RESEND_API_KEY is NOT set in the environment variables!";
      console.error(errorMsg);
      return res.status(500).json({ success: false, error: errorMsg });
    }

    console.log(`Attempting to send email to boogiilive@gmail.com from ${name} (${email})`);

    try {
      const { data, error } = await resend.emails.send({
        from: "CornerstoneAI <onboarding@resend.dev>",
        to: ["boogiilive@gmail.com"],
        subject: `[AI Lead] New Request from ${name}`,
        html: `
          <h3>New Lead from AI Chatbot</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project/Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(400).json({ success: false, error: error.message || "Resend API rejected the request" });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    
    app.use(vite.middlewares);
    
    // Catch-all for SPA in development
    app.use(async (req, res, next) => {
      if (req.method !== 'GET' || (req.headers.accept && !req.headers.accept.includes('text/html'))) {
        return next();
      }
      
      const url = req.originalUrl;
      if (url.startsWith('/api')) return next();

      try {
        const templatePath = path.join(process.cwd(), "index.html");
        if (!fs.existsSync(templatePath)) return next();

        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          vite.ssrFixStacktrace(e as Error);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
