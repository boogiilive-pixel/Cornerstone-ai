import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, phone, message } = req.body;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    const errorMsg = "RESEND_API_KEY is NOT set in the environment variables!";
    console.error(errorMsg);
    return res.status(500).json({ success: false, error: errorMsg });
  }

  try {
    const resend = new Resend(apiKey);
    console.log(`Attempting to send email to boogiilive@gmail.com from ${name} (${email})`);

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

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
  }
}
