const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");

router.route("/").post(companyController.createCompany);

module.exports = router;
