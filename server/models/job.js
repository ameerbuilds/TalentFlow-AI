const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    experience: {
      type: String,
      default: "Fresher",
    },

    salary: {
      type: String,
      default: "",
    },

    employmentType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
      ],
      default: "Full-Time",
    },

    workMode: {
      type: String,
      enum: [
        "On-Site",
        "Remote",
        "Hybrid",
      ],
      default: "On-Site",
    },

    location: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Open",
        "Closed",
        "Draft",
      ],
      default: "Open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);