import { User } from "../models/User.model.js";
import { generateJWT } from "../utils/jwt.js";
import { comparePassword } from "../utils/bcryptHashing.js";

const userLogin = async (req, res) => {
  const userData = req.body;

  if (!userData.email || !userData.password) {
    res.status(404);
    throw new Error("Provide the Email and Password!");
  }

  const userExist = await User.findOne({ email: userData.email }).select(
    "password",
  );

  if (!userExist) {
    res.status(404);
    throw new Error("User Not Found !");
  }

  const passwordVerified = await comparePassword(
    userData.password,
    userExist.password,
  );

  if (!passwordVerified) {
    res.status(401);
    throw new Error("Unotherized User");
  }

  const token = generateJWT(userExist._id);
  const cookieOptions = {
    httpOnly: true, //JavaScript cannot see this cookie.
    maxAge: 24 * 60 * 60 * 1000, //1 day in milliseconds

    //Cross-Origin
    secure: true,
    sameSite: "none",
  };

  res.status(200).cookie("teamflow_token", token, cookieOptions).json({
    success: true,
    message: "Login successfull !",
  });
};

export { userLogin };
