const Company = require("../models/Company");

// ==========================================
// Create Company
// POST /api/company
// Protected
// ==========================================

const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      website,
      industry,
      companySize,
      location,
      description,
      logo,
    } = req.body;

    if (!companyName || !companyEmail) {
      return res.status(400).json({
        success: false,
        message: "Company Name and Company Email are required",
      });
    }

    const existingCompany = await Company.findOne({ companyEmail });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      companyName,
      companyEmail,
      website,
      industry,
      companySize,
      location,
      description,
      logo,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
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
// Get All Companies
// GET /api/company
// Protected
// ==========================================

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate(
      "createdBy",
      "fullName email"
    );

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
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
// Get Company By ID
// GET /api/company/:id
// Protected
// ==========================================

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "createdBy",
      "fullName email"
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
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
// Update Company
// PUT /api/company/:id
// Protected
// ==========================================

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
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
// Delete Company
// DELETE /api/company/:id
// Protected
// ==========================================

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
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
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};