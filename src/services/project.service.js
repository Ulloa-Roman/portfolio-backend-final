import Project from '../models/project.model.js';

export const getAllProjects = async () => {
  return Project.find().sort({ createdAt: -1 }).lean();
};

export const getProjectById = async (id) => {
  return Project.findById(id).lean();
};

export const createProject = async (data) => {
  const p = new Project(data);
  return p.save();
};

export const deleteProject = async (id) => {
  return Project.findByIdAndDelete(id);
};

export const updateProject = async (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};
