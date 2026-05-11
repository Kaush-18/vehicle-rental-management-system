const express = require("express");

const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const router = express.Router();


// CREATE BOOKING
router.post(
  "/create",

  authMiddleware,

  roleMiddleware("user"),

  async (req, res) => {

    try {

      const {
        vehicleId,
        startDate,
        endDate
      } = req.body;

      const userId = req.user.id;

      // Find vehicle
      const vehicle =
        await Vehicle.findById(vehicleId);

      if (!vehicle) {

        return res.status(404).json({
          message: "Vehicle not found"
        });

      }

      // Calculate days
      const start =
        new Date(startDate);

      const end =
        new Date(endDate);

      const days =
        Math.ceil(
          (end - start) /
          (1000 * 60 * 60 * 24)
        );

      // Total price
      const totalPrice =
        days * vehicle.pricePerDay;

      // Create booking
      const booking =
        await Booking.create({

          userId,
          vehicleId,
          startDate,
          endDate,
          totalPrice,
          status: "pending"

        });

      res.status(201).json({

        message:
          "Booking created successfully",

        booking

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);


// GET ALL BOOKINGS
router.get(
  "/",

  async (req, res) => {

    try {

      const bookings =
        await Booking.find()
          .populate("userId")
          .populate("vehicleId");

      res.status(200).json(bookings);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);


// GET MY BOOKINGS
router.get(
  "/my-bookings",

  authMiddleware,

  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          userId: req.user.id

        }).populate("vehicleId");

      res.status(200).json(bookings);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);


// APPROVE BOOKING
router.put(
  "/approve/:id",

  authMiddleware,

  roleMiddleware(
    "owner",
    "admin"
  ),

  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndUpdate(

          req.params.id,

          {
            status: "approved"
          },

          { new: true }

        );

      res.status(200).json({

        message:
          "Booking approved",

        booking

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);


// REJECT BOOKING
router.put(
  "/reject/:id",

  authMiddleware,

  roleMiddleware(
    "owner",
    "admin"
  ),

  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndUpdate(

          req.params.id,

          {
            status: "rejected"
          },

          { new: true }

        );

      res.status(200).json({

        message:
          "Booking rejected",

        booking

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }
);

module.exports = router;