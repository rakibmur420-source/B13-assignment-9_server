# SportNest – Sports Facility Booking Platform (Server)

A RESTful backend API for SportNest, a full-stack sports facility booking platform. Built with Express.js and MongoDB, it handles user authentication, facility CRUD operations, and booking management for the SportNest client application.

**Live API link:**
https://sportnest-server-ml18.onrender.com/api

**Client live link:**
https://lighthearted-kheer-7787fd.netlify.app

## Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Token)
* bcryptjs
* cookie-parser
* cors
* dotenv

## Features

* JWT-based authentication with HTTPOnly cookies
* Secure password hashing using bcryptjs
* Protected private routes via custom auth middleware
* Facility CRUD (Create, Read, Update, Delete)
* Owner-only update/delete permission for facilities
* Search facilities by name using MongoDB `$regex`
* Filter facilities by sport type
* Booking creation, retrieval, and cancellation
* Auto-seeding of default facilities on server start
* CORS configured to support multiple client origins
* Centralized error handling with meaningful messages
* Environment variables used for all sensitive credentials

## API Routes

### Auth Routes
* POST `/api/auth/register` – Register a new user
* POST `/api/auth/login` – Login with email & password
* POST `/api/auth/google` – Login/Register via Google
* POST `/api/auth/logout` – Logout and clear auth cookie

### Facility Routes
* GET `/api/facilities` – Get all facilities (supports `search` & `type` query params)
* GET `/api/facilities/owner/:email` – Get facilities owned by a specific user (Private)
* GET `/api/facilities/:id` – Get a single facility by ID
* POST `/api/facilities` – Add a new facility (Private)
* PUT `/api/facilities/:id` – Update a facility (Private, owner only)
* DELETE `/api/facilities/:id` – Delete a facility (Private, owner only)

### Booking Routes
* GET `/api/bookings/user/:email` – Get bookings for a specific user (Private)
* POST `/api/bookings` – Create a new booking (Private)
* DELETE `/api/bookings/:id` – Cancel a booking (Private)

## How to Run Locally

* Clone the repository:
git clone https://github.com/rakibmur420-source/B13-assignment-9_server

* Go to the project folder:
cd sportnest-server

* Install dependencies:
npm install

* Run the development server:
npm run dev

* Environment Variables (.env)
PORT=5000
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
