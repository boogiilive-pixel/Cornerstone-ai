import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Initialize GoogleGenAI server-side with proper user-agent as per SDK guidelines
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

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

  // API Route for AI Chatbot via Gemini API
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Using simulated response for preview.");
      // Graceful fallback for preview when key is not loaded yet
      const lastMsg = messages[messages.length - 1]?.content || "";
      let reply = "Сайн уу! Би Сорнерстоун АЙ (Cornerstone AI) компанийн ухаалаг туслах байна. Одоогоор Gemini API түлхүүр тохируулагдаагүй байгаа тул танд бэлтгэсэн хариултыг өгч байна:\n\nБид танай бизнесийн хэрэгцээнд нийцсэн Вэб хөгжүүлэлт, Апп хөгжүүлэлт, болон AI Автоматжуулалтын шийдлүүдийг мэргэжлийн түвшинд хийж гүйцэтгэдэг. Та бидэнтэй холбогдох эсвэл 'Үнэ' багцууд маань сонирхож болно.";
      const lastMsgLower = lastMsg.toLowerCase();
      if (lastMsgLower.includes("үнэ") || lastMsgLower.includes("pricing") || lastMsgLower.includes("багц")) {
        reply = "Конерстоун АЙ компани нь вэбсайт, апп болон AI процессын автоматжуулалтыг уян хатан үнийн багцаар санал болгодог:\n\n1. **Энх (Starter)** - Вэб сайт & Лэндинг\n2. **Ухаалаг (Professional)** - Ухаалаг платформ & CRM систем\n3. **Далайцтай (Enterprise)** - Цогц систем & AI интеграц\n\nҮнийн дэлгэрэнгүйг манай 'Үнэ' цэснээс харах боломжтой.";
      } else if (lastMsgLower.includes("холбоо") || lastMsgLower.includes("contact") || lastMsgLower.includes("утас")) {
        reply = "Манайхтай холбоо барих мэдээлэл:\n- **Имэйл:** boogiilive@gmail.com\n- **Хаяг:** Улаанбаатар хот, Монгол Улс\n\nТа мөн доорх чатбот доторх 'Холбоо барих' формыг ашиглаж шууд мэдээллээ үлдээх боломжтой.";
      }
      return res.json({ text: reply });
    }

    try {
      if (!ai) {
        return res.status(500).json({ error: "AI agent failed to initialize securely." });
      }

      const systemInstruction = `Та бол Сорнерстоун АЙ (Cornerstone AI) компанийн албан ёсны ухаалаг туслах (AI Assistant) юм.
Харилцагчтай маш эелдэг, найрсаг, мэргэжлийн түвшинд Монгол эсвэл Англи хэл дээр харилцаарай.

Компани болон багийн талаарх мэдээлэл:
1. Үүсгэн байгуулагч & Гүйцэтгэх захирал (Founder & CEO): Л.Болор-Эрдэнэ (Boogii). Түүний баримталдаг зарчим: "Технологи бол зорилго биш, харин бодит асуудлыг шийдэх хэрэгсэл юм. Үнэн бодит үнэ цэн нь зөв асуултыг асууж, бизнест тохирсон хамгийн шилдэг шийдлийг босгоход оршино."
2. COO: Б. Энхжаргал (Өдөр тутмын үйл ажиллагаа, үйлчлүүлэгчийн харилцаа, төслийн удирдлага).
3. Lead Full-Stack Developer: Л. Болорсайхан (Техникийн архитектур, хөгжүүлэлт, React, Next.js, Node.js).
4. Junior Brand Designer: Б. Дөлгөөн (Визуал брэндинг, UI дизайн, нийгмийн сүлжээний контент).

Манай AI Агентууд (AI Agents):
- Oyun (Оюун): Судалгаа & Дүн шинжилгээний агент (Research AI). Зах зээлийн судалгаа, өрсөлдөгчдийн шинжилгээ, бизнесийн тайлан бэлтгэх чиглэлээр тусална.
- Goo (Гуу): Контент & Маркетингийн агент (Content AI). Монгол, Англи хэлээр сошиал пост, брэнд контент, имэйл маркетинг бэлтгэх чиглэлээр тусална.
- Erdem (Эрдэм): Frontend хөгжүүлэлтийн агент (Frontend AI). React, Next.js, Tailwind CSS, TypeScript ашиглан вэб болон ухаалаг мобайл интерфейс бүтээхэд тусална.
- Dalai (Далай): Backend хөгжүүлэлтийн агент (Backend AI). Node.js, Express, Python, PostgreSQL зэрэг систем дээр ажиллаж API, өгөгдлийн сан, AI интеграц хийнэ.

Манай үндсэн үйлчилгээнүүд (Services):
1. Вэб хөгжүүлэлт (Web Development): Маш хурдан, аюулгүй, хайлтын системд (SEO) дээгүүр ордог вэбүүд (Next.js, React).
2. Апп хөгжүүлэлт (App Development): iOS болон Android-д зориулсан орчин үеийн аппликейшнүүд.
3. AI Автоматжуулалт (AI Automation): Бизнесийн процессыг AI ашиглан автоматжуулж, зардлыг бууруулах, AI чатбот болон хэрэглэгчдэд зориулсан системийг нэвтрүүлэх.

Манай хийсэн зарим ажлууд (Case Studies):
1. Sahmyook MBC (Сам Юүк МБС) - sahmyookmbc.com: Самюүк Мэргэжлийн Боловсролын сургуулийн албан ёсны вэб сайт.
2. Togdu.com - togdu.com: Сууц өмчлөгчдийн холбооны үйл ажиллагааг хөнгөвчлөх, оршин суугчдад зориулсан ухаалаг платформ.
3. Мөн өмнөх бусад амжилттай дижитал болон дата аналитикийн төслүүд.

Зорилго:
Харилцагчдад дээрх мэдээллийн дагуу тодорхой бөгөөд зөв хариултуудыг өгөх, хэрэв тэд төсөл эхлүүлэх, зөвлөгөө авах сонирхолтой байвал "Төслөө эхлүүлэх" формыг бөглөхийг эсвэл холбоо барих мэдээллээ өгөхийг санал болгоорой.
Түүнчлэн, хэрэв хэрэглэгч төслийн хүсэлт өгөх эсвэл хамтарч ажиллах хүсэлтэй байвал тэднээс Нэр, Утас, Имэйл, Мессежийг асууж, ухаалгаар бүртгэж авах боломжтой гэдгийг хэлээрэй.
Асуултанд богино, ойлгомжтой, үнэ цэнэтэй байдлаар хариулна уу. Текст хариуг уншихад хялбар бөгөөд гоё формат дизайнтай байхаар Markdown ашиглаж гаргаарай.`;

      // Format previous messages correctly for the SDK (roles 'user' and 'model')
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content || m.text || "" }],
      }));

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: geminiResponse.text });
    } catch (err: any) {
      console.error("Gemini API Error in /api/chat:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI response" });
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
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        if (vite) {
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
