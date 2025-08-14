const errorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.status = err.status || 500;
  res.status(err.status).json({ success: false, error: err.message });
};
