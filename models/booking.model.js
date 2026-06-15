const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    facility_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    facility_name: { type: String, required: true },
    user_email: { type: String, required: true },
    booking_date: { type: String, required: true },
    time_slot: { type: String, required: true },
    hours: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);