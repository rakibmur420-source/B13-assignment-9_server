const express = require("express");
const router = express.Router();
const Facility = require("../models/facility.model");
const verifyToken = require("../middleware/auth.middleware");

// Get All Facilities (Public) with Search & Filter
router.get("/", async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (type) {
      query.facility_type = type;
    }

    const facilities = await Facility.find(query);
    res.json(facilities);
  } catch (error) {
    console.error("Get Facilities Error:", error.message);
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

// ⚠️ IMPORTANT: /owner/:email MUST come before /:id to avoid route conflict
// Get My Facilities by owner email (Private)
router.get("/owner/:email", verifyToken, async (req, res) => {
  try {
    const facilities = await Facility.find({ owner_email: req.params.email });
    res.json(facilities);
  } catch (error) {
    console.error("Get Owner Facilities Error:", error.message);
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

// Get Single Facility (Public)
router.get("/:id", async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility Not Found!" });
    }
    res.json(facility);
  } catch (error) {
    console.error("Get Single Facility Error:", error.message);
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

// Add Facility (Private)
router.post("/", verifyToken, async (req, res) => {
  try {
    const facility = new Facility(req.body);
    const result = await facility.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Add Facility Error:", error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

// Update Facility (Private)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!facility) {
      return res.status(404).json({ message: "Facility Not Found!" });
    }
    res.json(facility);
  } catch (error) {
    console.error("Update Facility Error:", error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

// Delete Facility (Private) jcnec
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility Not Found!" });
    }
    res.json({ message: "Facility Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Facility Error:", error.message);
    res.status(500).json({ message: error.message || "Server Error!" });
  }
});

module.exports = router;
