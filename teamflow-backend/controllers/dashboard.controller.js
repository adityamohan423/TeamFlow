import mongoose from "mongoose";
import { isMemberOfWorkspace } from "../helper/workspace.permissions.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { Project } from "../models/Project.model.js";
import { WorkSpace } from "../models/WorkSpace.model.js";
import { Task } from "../models/Task.model.js";

// http://localhost:3000/dashboard?workspaceId=6a5f7652ea271102e3903de2
const getDashboard = asyncHandler(async (req, res) => {
  const workspaceId = req.query.workspaceId;
  if (!workspaceId) {
    res.status(403);
    throw new Error("Provide WorksapceId !");
  }

  const currWorkspace = await WorkSpace.findById(workspaceId);
  if (!currWorkspace) {
    res.status(403);
    throw new Error("No Workspace Found !");
  }

  if (!isMemberOfWorkspace(currWorkspace, req.user._id)) {
    res.status(401);
    throw new Error("User is not Member of WorkSpace !");
  }

  const projectCount = await Project.countDocuments({ workspace: workspaceId });
  //WITHOUT FACET
  //   const aggregation = await Task.aggregate([
  //     {
  //       $match: {
  //         workspace: new mongoose.Types.ObjectId(workspaceId),
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$status",
  //         count: {
  //           $sum: 1,
  //         },
  //       },
  //     },
  //   ]);

  //   const recentTasks = await Task.find({
  //     workspace: workspaceId,
  //   })
  //     .sort({ createdAt: -1 })
  //     .limit(5)
  //     .select("title status priority dueDate");

  const aggregation = await Task.aggregate([
    {
      $match: {
        workspace: new mongoose.Types.ObjectId(workspaceId),
      },
    },
    {
      $facet: {
        totalTasks: [{ $count: "count" }],
        statusCount: [
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },
        ],
        recentTasks: [
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 5,
          },
          {
            $project: {
              title: 1,
              description: 1,
              status: 1,
              priority: 1,
            },
          },
        ],
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: { projectCount: projectCount },
    aggregation: aggregation,
  });
});

export { getDashboard };
