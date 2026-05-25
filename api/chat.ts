import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using simulated response.");
    const lastMsg = messages[messages.length - 1]?.content || "";
    let reply = "Сайн уу! Би Сорнерстоун АЙ (Cornerstone AI) компанийн ухаалаг туслах байна. Одоогоор Gemini API түлхүүр тохируулагдаагүй байгаа тул танд бэлтгэсэн хариултыг өгч байна:\n\nБид танай бизнесийн хэрэгцээнд нийцсэн Вэб хөгжүүлэлт, Апп хөгжүүлэлт, болон AI Автоматжуулалтын шийдлүүдийг мэргэжлийн түвшинд хийж гүйцэтгэдэг. Та бидэнтэй холбогдох эсвэл 'Үнэ' багцууд маань сонирхож болно.";
    const lastMsgLower = lastMsg.toLowerCase();
    if (lastMsgLower.includes("үнэ") || lastMsgLower.includes("pricing") || lastMsgLower.includes("багц")) {
      reply = "Конерстоун АЙ компани нь вэбсайт, апп болон AI процессын автоматжуулалтыг уян хатан үнийн багцаар санал болгодог:\n\n1. **Энх (Starter)** - Вэб сайт & Лэндинг\n2. **Ухаалаг (Professional)** - Ухаалаг платформ & CRM систем\n3. **Далайцтай (Enterprise)** - Цогц систем & AI интеграц\n\nҮнийн дэлгэрэнгүйг манай 'Үнэ' цэснээс харах боломжтой.";
    } else if (lastMsgLower.includes("холбоо") || lastMsgLower.includes("contact") || lastMsgLower.includes("утас")) {
      reply = "Манайхтай холбоо барих мэдээлэл:\n- **Имэйл:** boogiilive@gmail.com\n- **Хаяг:** Улаанбаатар хот, Монгол Улс\n\nТа мөн доорх чатбот доторх 'Холбоо барих' формыг ашиглаж шууд мэдээллээ үлдээх боломжтой.";
    }
    return res.status(200).json({ text: reply });
  }

  try {
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
1. Sahmyook MBC (Сам Юүк МБС) - sahmyookmbc.com: Самюүк Мэргэжлийн Боловсролын сургуулийн албан ёсны вэб сайт.
2. Togdu.com - togdu.com: Сууц өмчлөгчдийн холбооны үйл ажиллагааг хөнгөвчлөх, оршин суугчдад зориулсан ухаалаг платформ.
3. Мөн өмнөх бусад амжилттай дижитал болон дата аналитикийн төслүүд.

Зорилго:
Харилцагчдад дээрх мэдээллийн дагуу тодорхой бөгөөд зөв хариултуудыг өгөх, хэрэв тэд төсөл эхлүүлэх, зөвлөгөө авах сонирхолтой байвал "Төслөө эхлүүлэх" формыг бөглөхийг эсвэл холбоо барих мэдээллээ өгөхийг санал болгоорой.
Түүнчлэн, хэрэв хэрэглэгч төслийн хүсэлт өгөх эсвэл хамтарч ажиллах хүсэлтэй байвал тэднээс Нэр, Утас, Имэйл, Мессежийг асууж, ухаалгаар бүртгэж авах боломжтой гэдгийг хэлээрэй.
Асуултанд богино, ойлгомжтой, үнэ цэнэтэй байдлаар хариулна уу. Текст хариуг уншихад хялбар бөгөөд гоё формат дизайнтай байхаар Markdown ашиглаж гаргаарай.`;

    let formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content || m.text || "" }],
    }));

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

    return res.status(200).json({ text: geminiResponse.text });
  } catch (err: any) {
    console.error("Gemini API Error in /api/chat serverless function:", err);
    return res.status(500).json({ error: err.message || "Failed to generate AI response" });
  }
}
