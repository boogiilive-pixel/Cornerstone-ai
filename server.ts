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

  // API Route for Gemini Chat
  app.post("/api/goo-bot-v2", async (req, res) => {
    console.log("[SERVER] Received chat request to /api/goo-bot-v2:", JSON.stringify(req.body).substring(0, 100));
    const { messages } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("[GEMINI ERROR] API Key is missing in environment");
      return res.status(500).json({ error: "API Key олдсонгүй. Secrets хэсгээс тохируулна уу." });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemInstruction = "Та бол Cornerstone AI компанийн мэргэжлийн AI агент 'Гоо' юм. Зөвхөн манай компани, үйлчилгээнүүдтэй холбоотой мэдээлэл өгнө. Хэрэв хэрэглэгч ажил хийлгэх сонирхолтой байвал Нэр, Утас, Имэйлийг нь асууж авна. Мэдээллийг авсны дараа 'sendLeadInformation' функцийг ашиглан илгээнэ. Аль болох найрсаг, товч хариулна уу.";

      // Use generateContent instead of startChat for maximum compatibility if needed
      // But we try to format contents correctly
      const contents = (messages || []).map((m: any, i: number) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: (i === 0 && m.role === "model") ? systemInstruction + "\n\n" + m.text : m.text }]
      }));

      const tools: any = [{
        functionDeclarations: [{
          name: "sendLeadInformation",
          description: "Sends user contact information (lead) to Cornerstone AI team.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              phone: { type: SchemaType.STRING },
              email: { type: SchemaType.STRING },
              message: { type: SchemaType.STRING }
            },
            required: ["name", "phone", "email", "message"]
          }
        }]
      }];

      const result = await model.generateContent({
        contents,
        tools,
        systemInstruction: { role: "system", parts: [{ text: systemInstruction }] }
      });

      const response = result.response;
      
      // Safety check for empty response
      if (!response) {
        throw new Error("AI-аас хариу ирсэнгүй (Empty response)");
      }

      const functionCalls = response.functionCalls();
      if (functionCalls && functionCalls.length > 0) {
        return res.json({ 
          functionCall: {
            name: functionCalls[0].name,
            args: functionCalls[0].args
          }
        });
      }

      const text = response.text();
      return res.json({ text });

    } catch (err: any) {
      console.error("[SERVER CHAT ERROR]", err);
      // Detailed error for debugging
      const msg = err.message || "AI processing failed";
      res.status(500).json({ error: `AI Алдаа: ${msg}` });
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

    // SPA fallback
    app.use("*", async (req, res, next) => {
      if (req.method !== 'GET') return next();
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
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
