import { User } from "../models/User.model.js";
import { verifyJWT } from "../utils/jwt.js";

const authHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("User Not LoggedIn !");
  }

  const Verifed = verifyJWT(token);

  if (!Verifed) {
    res.status(401);
    throw new Error("Unautherized user!");
  }

  const user = await User.findById(Verifed.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  req.user = user;

  next();
};

export { authHandler };
