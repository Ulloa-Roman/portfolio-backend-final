import express from "express";
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/mailer.js";
const router = express.Router();

export const sendMessage = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    const newMessage = await Contact.create({ nombre, email, mensaje });
    res.status(200).json({ message: "Mensaje enviado", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando mensaje" });
  }
};

router.post("/", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    const newMessage = await Contact.create({ nombre, email, mensaje });

    try {
      await sendEmail({
        to: "romandanielulloa2022@icloud.com",
        subject: `Nuevo mensaje de ${nombre}`,
        text: `Has recibido un nuevo mensaje de ${nombre} (${email}):\n\n${mensaje}`,
      });
    } catch (emailErr) {
      console.error("Error enviando email:", emailErr);
    }

    res.status(200).json({ message: "Mensaje enviado", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando mensaje" });
  }
});


export default router;
