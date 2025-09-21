import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Configuro nodemailer con iCloud
const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

// Endpoint para enviar mensaje
router.post("/", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Guardo mensaje en MongoDB
    const newMessage = await Contact.create({ nombre, email, mensaje });

    // Envio email
    try {
      await sendEmail({
        to: process.env.EMAIL_USER, 
        subject: `Nuevo mensaje de ${nombre} desde tu portfolio`,
        text: `Has recibido un nuevo mensaje de ${nombre} (${email}):\n\n${mensaje}`,
      });
    } catch (emailErr) {
      console.error("Error enviando email:", emailErr);
    }

    res.status(200).json({ message: "Mensaje enviado y guardado", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando mensaje" });
  }
});

export default router;