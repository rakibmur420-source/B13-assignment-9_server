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
      query.facility_type = { $in: [type] };
    }

    const facilities = await Facility.find(query);
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
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
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Add Facility (Private)
router.post("/", verifyToken, async (req, res) => {
  try {
    const facility = new Facility(req.body);
    const result = await facility.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Update Facility (Private)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!facility) {
      return res.status(404).json({ message: "Facility Not Found!" });
    }
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Delete Facility (Private)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility Not Found!" });
    }
    res.json({ message: "Facility Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Get My Facilities (Private)
router.get("/owner/:email", verifyToken, async (req, res) => {
  try {
    const facilities = await Facility.find({
      owner_email: req.params.email,
    });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

module.exports = router;