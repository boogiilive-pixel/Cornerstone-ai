import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ 
      error: "Method Not Allowed", 
      message: "Please use POST request for chatbot." 
    });
  }

  const { messages } = req.body;
  const apiKey = process.env.GEMINI_API_KEY || 
                 process.env.GOOGLE_API_KEY || 
                 process.env.APP_GEMINI_KEY || 
                 process.env.API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined") {
    return res.status(500).json({ 
      error: "GEMINI_API_KEY_MISSING",
      details: "Google API Key missing. Please add GOOGLE_API_KEY to your environment variables."
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

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

    // Format history (skip initial bot greeting)
    const history = (messages || [])
      .filter((m: any, i: number) => i !== 0)
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

    return res.json({ text: response.text() });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ error: "AI боловсруулалт хийхэд алдаа гарлаа: " + (err.message || "") });
  }
}
