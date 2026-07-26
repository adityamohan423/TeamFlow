const golbalErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
};

export default golbalErrorHandler;
