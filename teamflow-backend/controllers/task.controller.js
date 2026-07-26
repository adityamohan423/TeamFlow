import asyncHandler from "../middleware/asyncHandler.js";
import { set } from "mongoose";
import { data } from "react-router-dom";
import { Project } from "../models/Project.model.js";
import { WorkSpace } from "../models/WorkSpace.model.js";
import { Task } from "../models/Task.model.js";
import { isMemberOfWorkspace } from "../helper/workspace.permissions.js";
import { isMemberOfProject } from "../helper/project.permissions.js";

// createTask
const createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId, priority, dueDate, assignedTo } =
    req.body;

  if (!title || !projectId) {
    res.status(400);
    throw new Error("Provide Proper Input !");
  }

  const currProject = await Project.findById(projectId)
    .populate("name")
    .populate("members", "name email")
    .populate("owner", "name email");

  if (!currProject) {
    res.status(404);
    throw new Error("Project Not Found !");
  }

  const currWorkspaceId = currProject.workspace;
  const currWorkspace = await WorkSpace.findById(currWorkspaceId);

  if (!isMemberOfWorkspace(currWorkspace, req.user._id)) {
    res.status(401);
    throw new Error("Not member of Workspace!");
  }

  //check if assigned person is member of project!!
  if (assignedTo && !isMemberOfProject(currProject, assignedTo)) {
    res.status(403);
    throw new Error("assigned user is not the Member of Project !");
  }

  if (!isMemberOfProject(currProject, req.user._id)) {
    res.status(401);
    throw new Error("Not member of Project!");
  }

  const isTaskExist = await Task.findOne({
    project: projectId,
    title: title,
  });

  if (isTaskExist) {
    res.status(409);
    throw new Error("Project Already Exist !");
  }

  const newTask = await Task.create({
    title,
    description,
    priority,
    dueDate,
    project: projectId,
    workspace: currWorkspaceId,
    assignedTo,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: newTask,
  });
});

// getTasks (http://localhost:3000/tasks?projectId=6a5f7652ea271102e3903de2&page=1&limit=10&priority=LOW&status=TODO)->projectId in query
const getTasks = asyncHandler(async (req, res) => {
  //sort=-createdAt,priority etc => -createdAt ;- descending
  const { currProjectId, status, priority, page, limit, sort, search } =
    req.query;

  const currProject = await Project.findById(currProjectId);
  if (!currProject) {
    res.status(404);
    throw new Error("Project does not Exist !");
  }

  if (!isMemberOfProject(currProject, req.user._id)) {
    res.status(403);
    throw new Error("Access Denied!");
  }

  // const tasks = await Task.find({ project: currProjectId });

  // if (!tasks) {
  //   res.status(404);
  //   throw new Error("Tasks Not Found !");
  // }
  const sortQuery = {};

  const allowedSortFields = ["createdAt", "priority", "status", "dueDate"];

  if (sort) {
    const field = sort.startsWith("-") ? sort.substring(1) : sort;

    if (allowedSortFields.includes(field)) {
      sortQuery[field] = sort.startsWith("-") ? -1 : 1; //createdAt:1 nd createdAt:-1
    }
  }

  const query = {};
  //adding project to query
  query.project = currProjectId;
  //status is added to query object defined above,
  if (status) {
    query.status = status;
  }
  if (priority) {
    query.priority = priority;
  }

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  const currPage = Number(page) || 1;
  const currLimit = Math.min(Number(limit) || 10, 100);

  const skip = (page - 1) * currLimit;

  const totalTasks = await Task.countDocuments(query);

  const totalPages = Math.ceil(totalTasks / currLimit);

  const tasks = await Task.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(currLimit);

  return res.status(200).json({
    tasks,
    currentPage: currPage,
    totalPages,
  });
});

// getTasksById
const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    res.status(400);
    throw new Error("Enter the Task ID!");
  }

  const currTask = await Task.findById(taskId)
    .populate("createdBy", "name email")
    .populate("project", "name")
    .populate("workspace", "name")
    .populate("assignedTo", "name email");

  if (!currTask) {
    res.status(404);
    throw new Error("Task Not Found !");
  }

  const currProject = await Project.findById(currTask.project);
  if (!currProject) {
    res.status(404);
    throw new Error("Project Not Found ! ");
  }

  if (!isMemberOfProject(currProject, req.user._id)) {
    res.status(401);
    throw new Error("User is not Member of Project !");
  }

  res.status(200).json({
    success: true,
    data: currTask,
  });
});

//***updateTask
const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;

  if (!taskId || !updateData) {
    res.status(400);
    throw new Error("Enter the Task ID Or Data!");
  }

  const currTask = await Task.findById(taskId);

  if (!currTask) {
    res.status(404);
    throw new Error("Task Not Found !");
  }

  const currProject = await Project.findById(currTask.project);
  const currWorkSpace = await WorkSpace.findById(currTask.workspace);

  //checking is user is project-owner or workspace-owner or assignee
  let isAssignee = false;

  if (currTask.assignedTo) {
    isAssignee = currTask.assignedTo.equals(req.user._id);
  }

  if (
    !currProject.owner.equals(req.user._id) &&
    !currWorkSpace.owner.equals(req.user._id) &&
    !isAssignee &&
    !currTask.createdBy.equals(req.user._id)
  ) {
    res.status(403);
    throw new Error("User is not Allowed to Update !");
  }

  let isAllowedToChange = ["title", "description", "status", "priority"];
  if (currTask.assignedTo && currTask.assignedTo.equals(req.user._id))
    isAllowedToChange = ["status"];

  let updates = {};

  isAllowedToChange.forEach((field) => {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  });

  const isTitleExist = await Task.findOne({
    title: updates.title,
    project: currTask.project,
  });
  if (isTitleExist) {
    res.status(409);
    throw new Error("Task with provided Title exists !!");
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
    returnDocument: "after",
  })
    .populate("project", "name")
    .populate("workspace", "name")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    data: updatedTask,
  });
});

//deleteTask
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;

  if (!taskId || !updateData) {
    res.status(400);
    throw new Error("Enter the Task ID Or Data!");
  }

  const currTask = await Task.findById(taskId);

  if (!currTask) {
    res.status(404);
    throw new Error("Task Not Found !");
  }

  const currProject = await Project.findById(currTask.project);
  const currWorkSpace = await WorkSpace.findById(currTask.workspace);

  if (
    !currProject.owner.equals(req.user._id) &&
    !currWorkSpace.owner.equals(req.user._id) &&
    !currTask.createdBy.equals(req.user._id)
  ) {
    res.status(403);
    throw new Error("User is not Allowed to Delete!");
  }

  const deletedTask = await Task.findByIdAndDelete(taskId, {
    returnDocument: "after",
  })
    .populate("project", "name")
    .populate("workspace", "name")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    message: "Task Deleted successfully !",
    data: deleteTask,
  });
});

//////////////////////////////////////////////////////

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
