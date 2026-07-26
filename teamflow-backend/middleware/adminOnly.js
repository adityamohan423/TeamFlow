const adminOnly = (req, res, next) => {
  const role = req.user.role;

  if (role !== "admin") {
    res.status(401);
    throw new Error("User access restricted !");
  }

  next();
};

export { adminOnly };
