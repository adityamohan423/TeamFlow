// createComment;
// getComments;
// updateComment;
// deleteComment;
import { isMemberOfProject } from "../helper/project.permissions.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { Project } from "../models/Project.model.js";
import { Task } from "../models/Task.model.js";
import { Comment } from "../models/Comment.model.js";
import { WorkSpace } from "../models/WorkSpace.model.js";
import { populate } from "dotenv";
import { isMemberOfWorkspace } from "../helper/workspace.permissions.js";

// createComment
const createComment = asyncHandler(async (req, res) => {
  const { text, taskId } = req.body;

  if (!text || !taskId) {
    res.status(400);
    throw new Error("Define text or taskId");
  }

  const currTask = await Task.findById(taskId);
  const currProject = await Project.findById(currTask.project);

  if (!isMemberOfProject(currProject, req.user._id)) {
    res.status(401);
    throw new Error("User can't Comment !");
  }

  const comment = await Comment.create({
    text,
    task: taskId,
    workspace: currTask.workspace,
    createdBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});
//getComments
const getComments = asyncHandler(async (req, res) => {
  const taskId = req.query.taskId;

  if (!taskId) {
    res.status(400);
    throw new Error("Define taskId");
  }

  const currTask = await Task.findById(taskId);
  if (!currTask) {
    res.status(404);
    throw new Erro("Task not Found");
  }
  const currProject = await Project.findById(currTask.project);
  const currWorkspace = await WorkSpace.findById(currTask.workspace);

  if (
    !isMemberOfProject(currProject, req.user._id) &&
    !isMemberOfWorkspace(currWorkspace, req.user._id)
  ) {
    res.status(401);
    throw new Error("User can't Comment !");
  }

  const comments = await Comment.find({ task: taskId });

  res.status(200).json({
    success: true,
    data: comments,
  });
});
//updateComment
const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const text = req.body;

  if (!text || !commentId) {
    res.status(403);
    throw new Error("Provide Input text !");
  }

  const currComment = await Comment.findById(commentId);
  if (!currComment) {
    res.status(404);
    throw new Error("Comment not Found !");
  }

  const currTask = await Task.findById(currComment.task);
  if (!currTask) {
    res.status(404);
    throw new Error("Task not Found !");
  }
  const currPtoject = await Project.findById(currTask.project);
  const currWorkspace = await WorkSpace.findById(currTask.workspace);

  if (
    !currComment.createdBy.equals(req.user._id) &&
    !currPtoject.owner.equals(req.user._id) &&
    !currWorkspace.owner.equals(req.user._id)
  ) {
    res.status(401);
    throw new Error("Cant Update Comment !");
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, text, {
    returnDocument: "after",
  })
    .populate("createdBy", "name email")
    .populate("task", "title");
  // .populate("workspace", "name");

  res.status(200).json({
    success: true,
    data: updatedComment,
  });
});
// deleteComment
const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;

  if (!commentId) {
    res.status(403);
    throw new Error("Provide Comment ID !");
  }

  const currComment = await Comment.findById(commentId);
  if (!currComment) {
    res.status(404);
    throw new Error("Comment Not found !");
  }

  const currTask = await Task.findById(currComment.task);
  if (!currTask) {
    res.status(404);
    throw new Error("Task Not found !");
  }

  const currProject = await Project.findById(currTask.project);
  if (!currProject) {
    res.status(404);
    throw new Error("Project Not found !");
  }

  const currWorkspace = await WorkSpace.findById(currTask.workspace);
  if (!currWorkspace) {
    res.status(404);
    throw new Error("WorkSpace Not found !");
  }

  if (
    !currComment.createdBy.equals(req.user._id) &&
    !currTask.createdBy.equals(req.user._id) &&
    !currProject.owner.equals(req.user._id) &&
    !currWorkspace.owner.equals(req.user._id)
  ) {
    res.status(401);
    throw new Error("User can't Delete the Comment !");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId)
    .populate("createdBy", "name email")
    .populate("task", "title");
  res.status(200).json({
    success: true,
    message: "Comment deleted successfully !",
    data: deletedComment,
  });
});
export { createComment, getComments, updateComment, deleteComment };
//
//
