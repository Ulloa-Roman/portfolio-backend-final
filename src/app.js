import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.js';


// Cargo variables de entorno
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);


// Creo app
const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: 'https://portfolio-frontend-final.vercel.app'
}));

app.use(express.json());

// Rutas
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
});

// Levanto servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));

