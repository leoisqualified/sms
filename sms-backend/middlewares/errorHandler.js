const errorHandler = (error, req, res, next) => {
  if (error) {
    // Check if error has a message
    if (error.message) {
      return res.status(400).json({
        status: "failed", // Ensure 'failed' is a string
        error: error.message,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        error: error,
      });
    }
  }

  // Pass control to the next middleware
  next();
};

export default errorHandler;
