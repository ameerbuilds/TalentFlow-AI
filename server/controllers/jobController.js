const Job = require("../models/Job");
const Company = require("../models/Company");

// ==========================================
// Create Job
// POST /api/job
// Protected
// ==========================================

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements,
      skills,
      experience,
      salary,
      employmentType,
      workMode,
      location,
    } = req.body;

    if (!title || !company || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, Company and Description are required",
      });
    }

    // Check company exists
    const companyExists = await Company.findById(company);

    if (!companyExists) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      skills,
      experience,
      salary,
      employmentType,
      workMode,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get All Jobs
// GET /api/job
// Protected
// ==========================================

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company", "companyName location")
      .populate("createdBy", "fullName email");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get Job By ID
// GET /api/job/:id
// Protected
// ==========================================

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("createdBy", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Update Job
// PUT /api/job/:id
// Protected
// ==========================================

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Delete Job
// DELETE /api/job/:id
// Protected
// ==========================================

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};