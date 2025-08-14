const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(messages.join(", "), 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate field value entered. A company with this name already exists.`;
    error = new ErrorHandler(message, 409);
  }
  if (err.name === "CastError") {
    const message = `Resource not found with this id: ${err.value}`;
    error = new ErrorHandler(message, 404);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
};
