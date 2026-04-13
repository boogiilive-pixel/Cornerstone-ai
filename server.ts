import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
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

  // API Route for sending emails via Resend
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!resend) {
      console.error("RESEND_API_KEY is NOT set in the environment variables!");
      return res.status(500).json({ success: false, error: "RESEND_API_KEY is missing on server" });
    }

    console.log(`Attempting to send email to boogiilive@gmail.com from ${name} (${email})`);

    try {
      const { data, error } = await resend.emails.send({
        from: "CornerstoneAI <onboarding@resend.dev>",
        to: ["boogiilive@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h3>New Contact Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(400).json({ success: false, error });
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
