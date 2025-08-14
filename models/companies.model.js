const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    industry: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Manufacturing",
        "Retail",
        "other",
      ],
    },
    employeeCount: { type: Number, min: 1 },
    website: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const company = mongoose.model("Company", companySchema);
module.exports = company;
