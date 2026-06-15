const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const facilityRoutes = require("./routes/facility.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("SportNest Server is Running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });