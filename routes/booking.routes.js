const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const Facility = require("../models/facility.model");
const verifyToken = require("../middleware/auth.middleware");

// Add Booking (Private)
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const result = await booking.save();

    // Increase booking count
    await Facility.findByIdAndUpdate(req.body.facility_id, {
      $inc: { booking_count: 1 },
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Get My Bookings (Private)
router.get("/user/:email", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user_email: req.params.email,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

// Cancel Booking (Private)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found!" });
    }
    res.json({ message: "Booking Cancelled Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
});

module.exports = router;