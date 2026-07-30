import { User } from "../models/User.model.js";
import { hashPassword } from "../utils/bcryptHashing.js";

//create
const createUser = async (req, res) => {
  const { name, email, password, passCode } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Incomplete credentials !");
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(409);
    throw new Error("User already Exists !");
  }

  //hashPassword returns a promise so need await to resolve it.
  const hashedPassword = await hashPassword(password);

  const user = "user";
  if (passCode && passCode === process.env.PASS_CODE) {
    user = "admin";
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: user,
  });

  return res.status(201).json({
    success: true,
    message: "user Created !",
    data: newUser,
  });
};

//get
const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users.length) {
    res.status(404);
    throw new Error("No User found !");
  }

  res.status(200).json({
    success: true,
    data: users,
  });
};

//get by id
const getUser = async (req, res) => {
  const id = req.params.id;

  const userExsit = await User.findById(id);

  if (!userExsit) {
    res.status(404);
    throw new Error("User not Found !");
  }

  res.status(200).json({
    success: true,
    data: userExsit,
  });
};

//update
const updateUser = async (req, res) => {
  const id = req.params.id;
  const toUpdate = req.body;

  const userExsit = await User.findById(id);
  if (!userExsit) {
    res.status(404);
    throw new Error("User not Found !");
  }

  //if it will throw any error, it will be catched by The asyncErrorhandler and then by GlobalErorHandler
  const updatedUser = await User.findOneAndUpdate({ _id: id }, toUpdate, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};

//delete
const deleteUser = async (req, res) => {
  const id = req.params.id;

  const userExsit = await User.findById(id);
  if (!userExsit) {
    res.status(404);
    throw new Error("User not Found !");
  }

  const deleteUser = await User.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    data: userExsit,
    message: "User Delete successfully !",
  });
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
