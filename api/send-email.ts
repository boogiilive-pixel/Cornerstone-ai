import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;
  console.log("Received lead request:", { name, email, phone });

  if (!resend) {
    console.error("RESEND_API_KEY is missing!");
    return res.status(500).json({ error: "RESEND_API_KEY is not configured on the server." });
  }

  try {
    console.log("Sending email via Resend...");
    const { data, error } = await resend.emails.send({
      from: "Cornerstone AI <info@cornerstone.dev>",
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
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
