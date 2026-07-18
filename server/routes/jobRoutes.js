const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// Create Job
router.post("/", protect, createJob);

// Get All Jobs
router.get("/", protect, getJobs);

// Get Job By ID
router.get("/:id", protect, getJobById);

// Update Job
router.put("/:id", protect, updateJob);

// Delete Job
router.delete("/:id", protect, deleteJob);

module.exports = router;