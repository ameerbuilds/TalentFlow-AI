const Application = require("../models/Application");
const Job = require("../models/job");

// ==========================================
// Apply for a Job
// POST /api/application
// Private
// ==========================================

const applyForJob = async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
      resume,
      coverLetter,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
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
// Get My Applications
// GET /api/application/my-applications
// Private
// ==========================================

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
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
// Recruiter - View Applications for a Job
// GET /api/application/job/:jobId
// Private
// ==========================================

const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("candidate", "fullName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
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
// Update Application Status
// PUT /api/application/:id/status
// Private
// ==========================================

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
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
  applyForJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
};