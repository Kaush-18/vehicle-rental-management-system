require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const vehicleRoutes =
  require("./routes/vehicleRoutes");

const bookingRoutes =
  require("./routes/bookingRoutes");

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/vehicles",
  vehicleRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);


// DATABASE CONNECTION

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected ✅"
  );

})

.catch((error) => {

  console.log(error);

});


// SERVER

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT} 🚀`
  );

});