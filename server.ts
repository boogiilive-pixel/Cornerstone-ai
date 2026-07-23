import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Support both ESM (development under tsx) and CommonJS (production compiled code)
const _filename = typeof import.meta !== "undefined" && import.meta.url
  ? fileURLToPath(import.meta.url)
  : ((globalThis as any).__filename || "");
const _dirname = typeof import.meta !== "undefined" && import.meta.url
  ? path.dirname(_filename)
  : ((globalThis as any).__dirname || "");

// Use these fallback safe variables in our code block
const __filename = _filename;
const __dirname = _dirname;

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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Using simulated response for preview.");
      const lastMsg = messages[messages.length - 1]?.content || "";
      const norm = lastMsg.toLowerCase();
      let reply = "";

      if (norm.includes("үнэ") || norm.includes("pricing") || norm.includes("багц") || norm.includes("хэд") || norm.includes("үнэтэй") || norm.includes("план")) {
        reply = "### 💰 Үнийн багцууд (Pricing Plans)\n\nСорнерстоун АЙ компани нь уян хатан, бизнесийн хэрэгцээнд бүрэн нийцсэн дараах үнийн багцуудыг санал болгодог:\n\n1. **Starter Foundation — ₮2,800,000+**\n   - Лэндинг хуудас, бүтээгдэхүүний танилцуулга вэбсайт\n   - Орчин үеийн цэвэрхэн дизайн, SEO хайлтын оновчлол\n   - Гар утсанд бүрэн зохицох дизайн\n\n2. **Growth Builder — ₮4,800,000+**\n   - Динамик вэб платформ, хэрэглэгчийн бүртгэлт систем, жижиг CRM\n   - Дотоод удирдлагын хянах самбар, API холболтууд\n\n3. **Enterprise Architect — Custom / Тохиролцох**\n   - Цогц вэб болон мобайл аппликейшн, өндөр ачаалал даах системүүд\n   - AI Агентууд болон өдөр тутмын процессын автоматжуулалт (LLM Integration)\n\nМанай өндөр түвшний зөвлөхүүдтэй холбогдож яг өөртөө тохирсон үнийн санал аваарай!";
      } else if (norm.includes("баг") || norm.includes("хамт олон") || norm.includes("team") || norm.includes("хүмүүс") || norm.includes("ceo") || norm.includes("захирал") || norm.includes("болор-эрдэнэ") || norm.includes("boogii") || norm.includes("энхжаргал") || norm.includes("болорсайхан") || norm.includes("дөлгөөн") || norm.includes("хэн")) {
        reply = "### 👥 Манай хамт олон (The Team)\n\nСорнерстоун АЙ компанийг салбартаа олон жил ажилласан дараах өндөр ур чадвартай баг хамт олон бүрдүүлдэг:\n\n- **Л. Болор-Эрдэнэ (Boogii)** — *Founder & CEO*\n  \"Технологи бол зорилго биш, харин бодит асуудлыг шийдэх хэрэгсэл юм. Үнэн бодит үнэ цэнэ нь бизнест тохирсон хамгийн шилдэг шийдлийг босгоход оршино.\"\n- **Б. Энхжаргал** — *COO*\n  Өдөр тутмын үйл ажиллагаа, үйлчлүүлэгчийн харилцааг мэргэжлийн түвшинд зохицуулагч.\n- **Л. Болорсайхан** — *Lead Full-Stack Developer*\n  Техникийн архитектурыг React, Next.js, Node.js зэрэг орчин үеийн технологиор гардан босгодог ахлах хөгжүүлэгч.\n- **Б. Дөлгөөн** — *Junior Brand Designer*\n  Брэндийн визуал дүр төрх, UI дизайн болон сошиал контент хөгжүүлэлтийг хариуцдаг.\n\nМанай баг хамт олон танай төслийн амжилтад бүрэн анхаарлаа хандуулан ажиллах болно! 🚀";
      } else if (norm.includes("үйлчилгээ") || norm.includes("services") || norm.includes("хийж чадах") || norm.includes("юу хийдэг") || norm.includes("ямар") || norm.includes("шийдэл")) {
        reply = "### 🛠️ Манай үндсэн үйлчилгээнүүд (What We Do)\n\nБид дараах 3 үндсэн чиглэлээр дижитал шийдлийг мэргэжлийн өндөр түвшинд хийж гүйцэтгэдэг:\n\n1. **Вэб хөгжүүлэлт (Web Development)**\n   Маш хурдан, аюулгүй, хайлтын системд (SEO) оновчтой, React / Next.js дээр суурилсан вэбсайтууд.\n\n2. **Аппликейшн хөгжүүлэлт (App Development)**\n   iOS болон Android үйлдлийн систем дээр ажиллах орчин үеийн, уян хатан хэрэглэгчийн интерфейстэй мобайл аппууд.\n\n3. **AI Автоматжуулалт (AI Automation & Chatbots)**\n   Бизнесийн процессыг хиймэл оюунаар автоматжуулж, өдөр тутмын үйлдлийн зардлыг бууруулах, LLM/API холболтууд болон чатботууд нэвтрүүлэх.\n\nТанд аль төрлийн үйлчилгээ илүү хэрэгтэй байна вэ? Бид тусалж чадна шүү!";
      } else if (norm.includes("төсөл") || norm.includes("хийгдсэн") || norm.includes("case") || norm.includes("portfolio") || norm.includes("ажил") || norm.includes("sahmyook") || norm.includes("togdu") || norm.includes("tselmegzorigt") || norm.includes("цэлмэгзоригт") || norm.includes("topaz") || norm.includes("топаз") || norm.includes("mentora") || norm.includes("ментор") || norm.includes("хуучин") || norm.includes("туршлага")) {
        reply = "### 📁 Бидний хийсэн ажлууд (Case Studies / Portfolio)\n\nБидний амжилттай хүлээлгэн өгсөн зарим онцлох ажлуудаас танилцуулъя:\n\n1. **Tselmegzorigt.com (Хувийн брэнд вэбсайт)**\n   Хувийн брэнд, контент бүтээгч болон мэргэжлийн үйл ажиллагааны орчин үеийн танилцуулга вэбсайт.\n\n2. **Topaz.mn (Топаз клиникийн вэбсайт)**\n   Эмнэлгийн цогц үйлчилгээ, эмчийн цаг захиалга, зөвлөгөө мэдээллийн орчин үеийн систем бүхий вэбсайт.\n\n3. **Mentora.mn (Хувь хүний AI ментор) — [mentora.mn](https://mentora.mn)**\n   Хэрэглэгчийн амьдралын 9 талбарыг оношилж, хувь хүний архитектур бүтээж, AI ментороор чиглүүлэх ухаалаг систем.\n\n4. **Sahmyook MBC (Сам Юүк МБС) — [sahmyookmbc.com](https://sahmyookmbc.com)**\n   Самюүк Мэргэжлийн Боловсролын Сургуулийн албан ёсны вэб сайт. Маш хурдан, хайлтын системд оновчтой бөгөөд олон хэлний сонголттой цогц танилцуулга вэб.\n\n5. **Togdu.com — [togdu.com](https://togdu.com)**\n   Сууц өмчлөгчдийн холбооны үйл ажиллагааг бүрэн хөнгөвчлөх, оршин суугчдад зориулсан ухаалаг төлбөрийн болон нэгдсэн хяналтын платформ.\n\nБид танай бизнесийн хамгийн шилдэг төслийг ч бас гардан хөгжүүлэхдээ баяртай байх болно! 🌟";
      } else if (norm.includes("агент") || norm.includes("оюун") || norm.includes("oyun") || norm.includes("гуу") || norm.includes("goo") || norm.includes("эрдэм") || norm.includes("erdem") || norm.includes("далай") || norm.includes("dalai") || norm.includes("робот") || norm.includes("хийсвэр")) {
        reply = "### 🤖 Манай Ажлын Ухаалаг Агентууд (AI Agents)\n\nTөслийн онцлогт тохируулан системдээ тусгай үүрэгтэй ухаалаг агентуудыг ажиллуулдаг:\n\n- **Oyun (Оюун) — Research AI**\n  Зах зээлийн судалгаа хийх, өрсөлдөгчдийг шинжлэх, бизнесийн гүнзгий тайлан бэлтгэх чиглэлээр дүн шинжилгээ хийнэ.\n- **Goo (Гуу) — Content AI**\n  Монгол, Англи хэл дээр сошиал сувгуудад зориулсан бүтээлч брэнд контент, имэйл болон маркетингийн бичвэрүүд бэлтгэнэ.\n- **Erdem (Эрдэм) — Frontend AI**\n  React, Next.js, Tailwind CSS ашиглан вэб болон гар утасны гайхалтай хэрэглэгчийн интерфейсийг (UI/UX) хурдан босгоно.\n- **Dalai (Далай) — Backend AI**\n  Өгөгдлийн сан, Node.js API-ууд, аюулгүй байдал болон хиймэл оюуны нарийн интеграцуудыг хариуцаж ажиллана.\n\nТанд ямар чиглэлээр туслах агент хэрэгтэй байна вэ?";
      } else if (norm.includes("холбоо") || norm.includes("contact") || norm.includes("утас") || norm.includes("имейл") || norm.includes("хаяг") || norm.includes("имэйл") || norm.includes("mail") || norm.includes("phone")) {
        reply = "### 📞 Холбоо барих мэдээлэл (Contact Information)\n\nТантай хамтран ажиллахад бид үргэлж бэлэн байна:\n\n- **Имэйл хаяг:** [boogiilive@gmail.com](mailto:boogiilive@gmail.com)\n- **Хариу өгөх хугацаа:** 24 цагийн дотор\n- **Байршил:** Улаанбаатар хот, Монгол Улс\n\nТа манай чат дотор байрлах **\"Төслийн хүсэлт илгээх 📝\"** товчийг дарж, мэдээллээ үлдээснээр манай багийнхан шууд таны имэйлээр холбогдох боломжтой шүү!";
      } else if (norm.includes("сайн уу") || norm.includes("сайн байна уу") || norm.includes("hello") || norm.includes("hi") || norm.includes("hey") || norm.includes("мэнд")) {
        reply = "Сайн байна уу! Сорнерстоун АЙ-ийн ухаалаг туслахтай холбогдсонд баярлалаа. 😊 Одоогоор Gemini API түлхүүр тохируулагдаж байгаа хэдий ч би танд компани болон манай үйлчилгээнүүдийн талаарх бүх мэдээллийг өгч чадна:\n\nБи танд манай **үйлчилгээнүүд, үнийн багц, баг хамт олон** болон **хийсэн төслүүд**ийн талаарх мэдээллийг өгч тусалж чадна. Надаас асуух зүйлээ бичнэ үү.";
      } else if (norm.includes("баярлалаа") || norm.includes("thank") || norm.includes("thanks") || norm.includes("ок") || norm.includes("за за") || norm.includes("тийн") || norm.includes("goy") || norm.includes("гоё")) {
        reply = "Зүгээр дээ, танд тусалж чадсандаа маш их баяртай байна! Өөр туслах зүйл байвал хэзээд бэлэн шүү. Өдрийг сайхан өнгөрүүлээрэй! ☀️✨";
      } else {
        reply = "Сайн уу! Би Сорнерстоун АЙ (Cornerstone AI) компанийн ухаалаг туслах байна. Танд дараах сэдвүүдийн хүрээнд туслах боломжтой:\n\n1. **💰 Үнийн багцууд** — Starter, Professional, Enterprise багцуудын тухай мэдээлэл\n2. **🛠️ Үйлчилгээнүүд** — Вэб, Аппликейшн хөгжүүлэлт, AI автоматжуулалтын шийдэл\n3. **👥 Манай хамт олон** — CEO Boogii болон үүсгэн байгуулагчид, инженерийн баг\n4. **📁 Бидний хийсэн ажлууд** — Sahmyook MBC, Togdu вэбсистемийн туршлага\n5. **📞 Холбоо барих** — boogiilive@gmail.com имэйл мэдээлэл\n\nТа сонирхож буй сэдвээсээ асуувал би дэлгэрэнгүй хариулахад бэлэн байна. 😊";
      }
      return res.json({ text: reply });
    }

    try {
      // Dynamic lazy initialization inside handler for robustness
      const activeAi = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

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
1. Tselmegzorigt.com - Хувийн брэнд, контент бүтээгч болон мэргэжлийн үйл ажиллагааны орчин үеийн танилцуулга вэбсайт.
2. Topaz.mn - Топаз Эмнэлэг: Эмнэлгийн цогц үйлчилгээ, эмчийн цаг захиалга, эрүүл мэндийн зөвлөгөө болон мэдээллийн вэб систем.
3. Mentora.mn - Хувь хүний AI ментор: Хэрэглэгчийн амьдралын 9 талбарыг оношилж, хувь хүний архитектур бүтээж, AI ментороор чиглүүлэх ухаалаг систем.
4. Sahmyook MBC (Сам Юүк МБС) - sahmyookmbc.com: Самюүк Мэргэжлийн Боловсролын сургуулийн албан ёсны вэб сайт.
5. Togdu.com - togdu.com: Сууц өмчлөгчдийн холбооны үйл ажиллагааг хөнгөвчлөх, оршин суугчдад зориулсан ухаалаг платформ.
6. Мөн өмнөх бусад амжилттай дижитал болон дата аналитикийн төслүүд.

Зорилго:
Харилцагчдад дээрх мэдээллийн дагуу тодорхой бөгөөд зөв хариултуудыг өгөх, хэрэв тэд төсөл эхлүүлэх, зөвлөгөө авах сонирхолтой байвал "Төслөө эхлүүлэх" формыг бөглөхийг эсвэл холбоо барих мэдээллээ өгөхийг санал болгоорой.
Түүнчлэн, хэрэв хэрэглэгч төслийн хүсэлт өгөх эсвэл хамтарч ажиллах хүсэлтэй байвал тэднээс Нэр, Утас, Имэйл, Мессежийг асууж, ухаалгаар бүртгэж авах боломжтой гэдгийг хэлээрэй.
Асуултанд богино, ойлгомжтой, үнэ цэнэтэй байдлаар хариулна уу. Текст хариуг уншихад хялбар бөгөөд гоё формат дизайнтай байхаар Markdown ашиглаж гаргаарай.`;

      // Format previous messages correctly for the SDK (roles 'user' and 'model')
      let formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content || m.text || "" }],
      }));

      // CRITICAL: The Gemini conversation contents MUST start with a 'user' message turn.
      // We filter out any leading introductory 'model' messages (e.g., the welcome message).
      const firstUserIndex = formattedContents.findIndex((item: any) => item.role === "user");
      if (firstUserIndex !== -1) {
        formattedContents = formattedContents.slice(firstUserIndex);
      } else {
        formattedContents = [{ role: "user", parts: [{ text: "Hello" }] }];
      }

      const geminiResponse = await activeAi.models.generateContent({
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
