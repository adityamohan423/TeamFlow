import asyncHandler from "../middleware/asyncHandler.js";
import { set } from "mongoose";
import { data } from "react-router-dom";
import { Project } from "../models/Project.model.js";
import { WorkSpace } from "../models/WorkSpace.model.js";
import { isMemberOfWorkspace } from "../helper/workspace.permissions.js";
import { isMemberOfProject } from "../helper/project.permissions.js";

// createProject
const createProject = asyncHandler(async (req, res) => {
  const { name, description, workspaceId } = req.body;

  if (!name || !workspaceId) {
    res.status(400);
    throw new Error("Provide Proper Input !");
  }

  const currWorkspace = await WorkSpace.findById(workspaceId)
    .populate("name")
    .populate("members", "name email")
    .populate("owner", "name email");

  if (!currWorkspace) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  if (!isMemberOfWorkspace(currWorkspace, req.user._id)) {
    res.status(401);
    throw new Error("Not member of Workspace!");
  }

  const isProjectExist = await Project.findOne({
    workspace: workspaceId,
    name: name,
  });

  if (isProjectExist) {
    res.status(409);
    throw new Error("Project Already Exist !");
  }

  const newProject = await Project.create({
    name: name,
    description: description,
    workspace: workspaceId,
    owner: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json({
    success: true,
    data: newProject,
  });
});

// getProjects (http://localhost:3000/projects?workspaceId=6a5f7652ea271102e3903de2)->workspaceid in query
const getProjects = asyncHandler(async (req, res) => {
  const currWorkspaceId = req.query.workspaceId;

  const currWorkspace = await WorkSpace.findById(currWorkspaceId);
  if (!currWorkspace) {
    res.status(404);
    throw new Error("WorkSpace does not Exist !");
  }

  const isMember = currWorkspace.members.find((member) =>
    member.equals(req.user._id),
  );
  if (!isMember) {
    res.status(403);
    throw new Error("Access Denied!");
  }

  const projects = await Project.find({ workspace: currWorkspaceId })
    .populate("members", "name email")
    .populate("owner", "name email")
    .populate("workspace", "name");

  if (projects.length === 0) {
    res.status(404);
    throw new Error("Projects Not Found !");
  }

  res.status(200).json({
    success: true,
    data: projects,
  });
});

// getProjectById
const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    res.status(400);
    throw new Error("Enter the Project ID!");
  }

  const currProject = await Project.findById(projectId)
    .populate("members", "name email")
    .populate("owner", "name email");

  if (!currProject) {
    res.status(404);
    throw new Error("Project Not Found !");
  }

  if (!currProject.members.find((member) => member.equals(req.user._id))) {
    res.status(403);
    throw new Error("User is Not member of Project !");
  }

  res.status(200).json({
    success: true,
    data: currProject,
  });
});

//***updateProject
const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const updateData = req.body;

  if (!projectId || !updateData || updateData.length === 0) {
    res.status(400);
    throw new Error("Enter the Project ID Or Data!");
  }

  const currProject = await Project.findById(projectId);

  if (!currProject) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  if (!currProject.members.find((member) => member.equals(req.user._id))) {
    res.status(403);
    throw new Error("User is Not member of Project !");
  }

  const isAllowedToChange = ["name", "description", "projectStatus"];
  let updates = {};

  isAllowedToChange.forEach((field) => {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  });

  const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
    returnDocument: "after",
  })
    .populate("workspace", "name")
    .populate("owner", "name email")
    .populate("members", "name email");

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

//deleteProject
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    res.status(400);
    throw new Error("Enter the Project ID");
  }

  const currProject = await Project.findById(projectId)
    .populate("owner", "name email")
    .populate("members", "name email")
    .populate("workspace", "name owner");

  if (!currProject) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  //owner-of-Project or admin of workspace can delete it.
  if (
    !currProject.owner._id.equals(req.user._id) &&
    !currProject.workspace.owner.equals(req.user._id)
  ) {
    res.status(403);
    throw new Error("Not the Owner of the Project Or Admin of WorkSpace !!");
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);

  res.status(200).json({
    success: true,
    message: "WorkSpace Deleted successfully !",
    data: deletedProject,
  });
});

//////////////////////////////////////////////////////

// getWorkSpaceMembers
const getProjectMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;

  const workSpaceMembers = await WorkSpace.findById(workspaceId).populate(
    "members",
    "name email",
  );

  if (!workSpaceMembers) {
    res.status(404);
    throw new Error("NO members Found !");
  }

  return res.status(200).json({
    success: true,
    data: workSpaceMembers,
  });
});

// addWorkSpaceMembers
const addProjectMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { membersData } = req.body;

  const workspace = await WorkSpace.findById(workspaceId);

  if (membersData.length === 0) {
    res.status(400);
    throw new Error("Provide members to add!");
  }

  if (!workspace) {
    res.status(404);

    throw new Error("No WorkSpace Found !");
  }

  if (!workspace.owner.equals(req.user._id)) {
    res.status(401);
    throw new Error("Unautherized Access !!");
  }

  const updatedMembers = await WorkSpace.findByIdAndUpdate(
    { _id: workspaceId },
    { $addToSet: { members: { $each: membersData } } },
    { new: true },
  ).populate("members", "name email");

  return res.status(200).json({
    success: true,
    data: updatedMembers,
  });
});

// removeWorkSpaceMembers
const removeProjectMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { membersData } = req.body;

  const workspace = await WorkSpace.findById(workspaceId);

  if (membersData.length === 0) {
    res.status(400);
    throw new Error("Provide members to remove !");
  }

  if (!workspace) {
    res.status(404);
    throw new Error("No WorkSpace Found !");
  }

  if (!workspace.owner.equals(req.user._id)) {
    res.status(403);
    throw new Error("Unautherized Access !!");
  }

  const updatedMembers = await WorkSpace.findByIdAndUpdate(
    { _id: workspaceId },
    { $pull: { members: { $in: membersData } } },
    { new: true },
  ).populate("members", "name email");

  return res.status(200).json({
    success: true,
    message: "Members deleted successfully !",
    data: updatedMembers,
  });
});

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMembers,
  removeProjectMembers,
};
