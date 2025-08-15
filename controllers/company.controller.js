const Company = require("../models/companies.model");
const asyncHandler = require("../middlewares/asynchandler");
const ErrorHandler = require("../middlewares/error");
// company create request
exports.createCompany = asyncHandler(async (req, res, next) => {
  const newCompany = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: newCompany,
    message: "Company created successfully",
  });
});

//get company request
exports.getCompanies = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  let queryFilter = {};
  if (req.query.industry) {
    queryFilter.industry = req.query.industry;
  }
  if (req.query.minAnnualRevenue || req.query.maxAnnualRevenue) {
    queryFilter.annualRevenue = {};
    if (req.query.minAnnualRevenue) {
      queryFilter.annualRevenue.$gte = req.query.minAnnualRevenue;
    }
    if (req.query.maxAnnualRevenue) {
      queryFilter.annualRevenue.$lte = req.query.maxAnnualRevenue;
    }
  }

  const companies = await Company.find(queryFilter).skip(skip).limit(limit);
  const totalCompanies = await Company.countDocuments(queryFilter);
  res.status(200).json({
    success: true,
    count: companies.length,
    total: totalCompanies,
    page: page,
    pages: Math.ceil(totalCompanies / limit),
    data: companies,
    message: "Companies retrieved successfully",
  });
});

// get company by id
exports.getCompanyById = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorHandler(`Company not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: company,
    message: "Company retrieved successfully",
  });
});

// update company
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!company) {
    return next(
      new ErrorHandler(`Company not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: company,
    message: "Company updated successfully",
  });
});

// delete company
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return next(
      new ErrorHandler(`Company not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Company deleted successfully",
  });
});

// search autocomplete
exports.searchCompanies = asyncHandler(async (req, res, next) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return next(new ErrorHandler("A search query 'q' is required.", 400));
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const queryFilter = { name: { $regex: searchTerm, $options: "i" } };
  const companies = await Company.find(queryFilter).skip(skip).limit(limit);
  const totalCompanies = await Company.countDocuments(queryFilter);
  res.status(200).json({
    success: true,
    count: companies.length,
    total: totalCompanies,
    page: page,
    pages: Math.ceil(totalCompanies / limit),
    data: companies,
    message: "Search results retrieved successfully",
  });
});
