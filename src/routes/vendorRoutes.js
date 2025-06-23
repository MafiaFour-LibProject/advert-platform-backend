const express = require("express");
const {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

const router = express.Router();

// GET all vendors
router.get("/", getAllVendors);

// GET vendor by ID
router.get("/:id", getVendorById);

// POST create vendor
router.post("/", createVendor);

// PUT update vendor
router.put("/:id", updateVendor);

// DELETE vendor
router.delete("/:id", deleteVendor);

module.exports = router;