import * as service from '../services/project.service.js';
import { validationResult } from 'express-validator';

export const listProjects = async (req, res, next) => {
  try {
    const projects = await service.getAllProjects();
    res.json( projects );
  } catch (err) { next(err); }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await service.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json({ project });
  } catch (err) { next(err); }
};

export const createProjectController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const project = await service.createProject(req.body);
    res.status(201).json({ project });
  } catch (err) { next(err); }
};

export const updateProjectController = async (req, res, next) => {
  try {
    const project = await service.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json({ project });
  } catch (err) { next(err); }
};

export const deleteProjectController = async (req, res, next) => {
  try {
    await service.deleteProject(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (err) { next(err); }
};
