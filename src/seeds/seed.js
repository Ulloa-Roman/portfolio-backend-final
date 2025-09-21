import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Project from '../models/project.model.js';

const seed = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    const projects = [
      {
        title: 'Portfolio Personal',
        description: 'Portfolio hecho con React y Node. Muestra proyectos y contacto.',
        technologies: ['React', 'Express', 'MongoDB'],
        liveUrl: '',
        repoUrl: 'https://github.com/tuusuario/portfolio',
        image: ''
      },
      {
        title: 'Simulador Física',
        description: 'App para visualizar simulaciones físicas y análisis numérico.',
        technologies: ['React', 'D3', 'Python'],
        repoUrl: '',
        image: ''
      },
      {
        title: 'Blog Técnico',
        description: 'Blog para compartir artículos técnicos y tutoriales.',
        technologies: ['Gatsby', 'GraphQL', 'Markdown'],
        liveUrl: '',
        repoUrl: '',
        image: ''
      },
      {
        title: 'E-commerce',
        description: 'Tienda online con carrito de compras y pasarela de pago.',
        technologies: ['Vue', 'Node', 'Stripe'],
        liveUrl: '',
        repoUrl: '',
        image: ''
      }
    ];
    await Project.insertMany(projects);
    console.log('DB seeded con proyectos');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
