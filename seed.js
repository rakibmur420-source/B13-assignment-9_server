const Facility = require("./models/facility.model");

const DEFAULT_FACILITIES = [
  {
    name: "Green Turf Football Ground",
    facility_type: "Football",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&fit=crop",
    location: "Gulshan, Dhaka",
    price_per_hour: 50,
    capacity: 22,
    available_slots: ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"],
    description: "Premium football turf with floodlights for evening matches.",
    owner_email: "admin@sportnest.com",
  },
  {
    name: "Smash Badminton Arena",
    facility_type: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop",
    location: "Dhanmondi, Dhaka",
    price_per_hour: 30,
    capacity: 4,
    available_slots: ["08:00 AM - 09:00 AM", "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "06:00 PM - 07:00 PM"],
    description: "Professional indoor badminton courts with wooden flooring.",
    owner_email: "admin@sportnest.com",
  },
  {
    name: "Olympic Swimming Pool",
    facility_type: "Swimming",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop",
    location: "Banani, Dhaka",
    price_per_hour: 40,
    capacity: 20,
    available_slots: ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "05:00 PM - 06:00 PM"],
    description: "Olympic size swimming pool with trained lifeguard staff.",
    owner_email: "admin@sportnest.com",
  },
  {
    name: "Roland Garros Tennis Court",
    facility_type: "Tennis",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop",
    location: "Uttara, Dhaka",
    price_per_hour: 60,
    capacity: 4,
    available_slots: ["04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM"],
    description: "Premium clay and hard tennis courts for all skill levels.",
    owner_email: "admin@sportnest.com",
  },
  {
    name: "Premier Cricket Ground",
    facility_type: "Cricket",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop",
    location: "Mirpur, Dhaka",
    price_per_hour: 80,
    capacity: 22,
    available_slots: ["08:00 AM - 09:00 AM", "09:00 AM - 10:00 AM", "02:00 PM - 03:00 PM"],
    description: "Full size cricket ground with practice nets and pavilion.",
    owner_email: "admin@sportnest.com",
  },
  {
    name: "Elite Basketball Court",
    facility_type: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop",
    location: "Mohammadpur, Dhaka",
    price_per_hour: 35,
    capacity: 10,
    available_slots: ["03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "07:00 PM - 08:00 PM"],
    description: "Indoor basketball court with professional flooring and hoops.",
    owner_email: "admin@sportnest.com",
  },
];

const seedDefaultFacilities = async () => {
  try {
    for (const facilityData of DEFAULT_FACILITIES) {
      const exists = await Facility.findOne({ name: facilityData.name });
      if (!exists) {
        await Facility.create(facilityData);
        console.log(`Seeded: ${facilityData.name}`);
      }
    }
    console.log("Default facilities seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error.message);
  }
};

module.exports = seedDefaultFacilities;
