const Company = require("../models/companies.model");
const asyncHandler = require("../middlewares/asynchandler");
// company create request
exports.createCompany = asyncHandler(async (req, res, next) => {
  const newCompany = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: newCompany,
    message: "Company created successfully",
  });
});
