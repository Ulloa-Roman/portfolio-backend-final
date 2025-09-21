import express from 'express';
import { body } from 'express-validator';
import * as ctrl from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', ctrl.listProjects);
router.get('/:id', ctrl.getProject);
router.post('/',
  body('title').isLength({ min: 2 }).withMessage('Título requerido'),
  body('description').isLength({ min: 5 }).withMessage('Descripción requerida'),
  ctrl.createProjectController
);
router.put('/:id', ctrl.updateProjectController);
router.delete('/:id', ctrl.deleteProjectController);

export default router;
