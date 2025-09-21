import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Endpoint para guardar mensaje
router.post("/", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Guardar mensaje en MongoDB
    const newMessage = await Contact.create({ nombre, email, mensaje });

    // Responder con JSON
    res.status(200).json({ message: "Mensaje guardado correctamente", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando mensaje" });
  }
});

export default router;
