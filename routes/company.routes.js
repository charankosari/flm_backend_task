const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");

//create, get all companies with filter
router.route("/search").get(companyController.searchCompanies);
router
  .route("/")
  .post(companyController.createCompany)
  .get(companyController.getCompanies);

//   update,delete,get company by id
router
  .route("/:id")
  .put(companyController.updateCompany)
  .delete(companyController.deleteCompany)
  .get(companyController.getCompanyById);

// search autocomplete

module.exports = router;
