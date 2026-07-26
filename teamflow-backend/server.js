import express from "express";
import "dotenv/config";
import userRoute from "./routes/user.routes.js";
import loginRoute from "./routes/login.routes.js";
import connectDB from "./config/db.js";
import golbalErrorHandler from "./middleware/golbalErrorHandler.js";
import workSpaceRoute from "./routes/workSpace.routes.js";
import projectRoute from "./routes/project.routes.js";
import taskRoute from "./routes/task.routes.js";
import commentRoute from "./routes/comment.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";

const app = express();
const PORT = process.env.PORT;
await connectDB();

app.use(express.json());

app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/workspace", workSpaceRoute);
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);
app.use("/comments", commentRoute);
app.use("/dashboard", dashboardRoute);
app.use(golbalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
