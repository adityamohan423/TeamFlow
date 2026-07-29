import { WorkSpace } from "../models/WorkSpace.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { set } from "mongoose";

// createWorkspace
const createWorkspace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Define Name !");
  }

  const newWorkSpace = await WorkSpace.create({
    name: name,
    description: description,
    owner: req.user._id,
    members: [req.user._id],
  });

  res.status(200).json({
    success: true,
    data: newWorkSpace,
  });
});

// getWorkspaces
const getWorkspaces = asyncHandler(async (req, res) => {
  const workSpaces = await WorkSpace.find({
    members: req.user._id,
  }).populate("members", "name email");

  if (workSpaces.length === 0) {
    res.status(404);
    throw new Error("No Workspace Found !");
  }

  res.status(200).json({
    success: true,
    data: workSpaces,
  });
});

// getWorkspaceById
const getWorkspaceById = asyncHandler(async (req, res) => {
  const workSpaceId = req.params.id;

  if (!workSpaceId) {
    res.status(400);
    throw new Error("Enter the Workspace ID!");
  }

  const currWorkSpace = await WorkSpace.findById(workSpaceId).populate(
    "members",
    "name email",
  );

  if (!currWorkSpace) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  const isMemberOfWorkSpace = currWorkSpace.members.find((member) => {
    return member._id.equals(req.user._id);
  });

  if (!isMemberOfWorkSpace) {
    res.status(401);
    throw new Error("No workSpace Found !");
  }

  res.status(200).json({
    success: true,
    data: currWorkSpace,
  });
});

//updateWorkspace (update name and description)
const updateWorkspace = asyncHandler(async (req, res) => {
  const workSpaceId = req.params.id;
  const updateData = req.body;

  if (!updateData.name || !updateData.description) {
    res.status(400);
    throw new Error("Incomlete Input Data !");
  }

  if (!workSpaceId || !updateData) {
    res.status(400);
    throw new Error("Enter the Workspace ID Or Data!");
  }

  const currWorkSpace = await WorkSpace.findById(workSpaceId);
  if (!currWorkSpace) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  const isOwner = currWorkSpace.owner.equals(req.user._id);
  if (!isOwner) {
    res.status(401);
    throw new Error("Access Denied (user is not the owner of WorkSpace) !!");
  }

  const updateCurrWorkSpace = await WorkSpace.findByIdAndUpdate(
    workSpaceId,
    { name: updateData.name, description: updateData.description },
    { new: true },
  );

  res.status(200).json({
    success: true,
    data: updateCurrWorkSpace,
  });
});

//deleteWorkspace
const deleteWorkspace = asyncHandler(async (req, res) => {
  const workSpaceId = req.params.id;

  if (!workSpaceId) {
    res.status(400);
    throw new Error("Enter the Workspace ID");
  }

  const currWorkSpace = await WorkSpace.findById(workSpaceId);

  if (!currWorkSpace) {
    res.status(404);
    throw new Error("Workspace Not Found !");
  }

  if (!currWorkSpace.owner.equals(req.user._id)) {
    res.status(403);
    throw new Error("Access Denied (user is not the owner of WorkSpace) !!");
  }

  await WorkSpace.findByIdAndDelete(workSpaceId);

  res.status(200).json({
    success: true,
    message: "WorkSpace Deleted successfully !",
    data: currWorkSpace,
  });
});

//////////////////////////////////////////////////////

const getWorkSpaceMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;

  const workSpaceMembers = await WorkSpace.findById(workspaceId)
    .populate("members", "name email")
    .populate("owner", "name email");

  if (!workSpaceMembers) {
    res.status(404);
    throw new Error("NO members Found !");
  }

  const isMember = workSpaceMembers.members.find((member) =>
    member._id.equals(req.user._id),
  );
  if (!isMember) {
    res.status(401);
    throw new Error("Not a Member of WorkSpace !");
  }

  return res.status(200).json({
    success: true,
    data: {
      workspaceName: workSpaceMembers.name,
      owner: workSpaceMembers.owner,
      members: workSpaceMembers.members,
    },
  });
});

const addWorkSpaceMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { membersData } = req.body;

  if (!membersData || membersData.length === 0) {
    res.status(400);
    throw new Error("Provide members to add!");
  }

  const workspace = await WorkSpace.findById(workspaceId);

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
    { returnDocument: "after" },
  ).populate("members", "name email");

  return res.status(200).json({
    success: true,
    data: updatedMembers,
  });
});

const removeWorkSpaceMembers = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { membersData } = req.body;

  if (!membersData || membersData.length === 0) {
    res.status(400);
    throw new Error("Provide members to remove !");
  }

  const workspace = await WorkSpace.findById(workspaceId);

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
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  getWorkSpaceMembers,
  addWorkSpaceMembers,
  removeWorkSpaceMembers,
};
