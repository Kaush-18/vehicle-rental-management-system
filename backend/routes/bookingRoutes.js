const express = require("express");

const Booking =
  require("../models/Booking");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const router = express.Router();


// ================= CREATE BOOKING =================

router.post(

  "/book",

  authMiddleware,

  async (req, res) => {

    try {

      const {

        vehicleId,
        startDate,
        endDate

      } = req.body;

      // CHECK EXISTING BOOKING

      const existingBooking =
        await Booking.findOne({

          vehicleId,

          status: "approved",

          $or: [

            {

              startDate: {
                $lte: endDate
              },

              endDate: {
                $gte: startDate
              }

            }

          ]

        });

      if (existingBooking) {

        return res.status(400).json({

          message:
            "Vehicle already booked for selected dates"

        });

      }

      // CREATE BOOKING

      const booking =
        await Booking.create({

          userId:
            req.user.id,

          vehicleId,

          startDate,

          endDate,

          status:
            "pending"

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


// ================= GET BOOKINGS =================

router.get(

  "/",

  authMiddleware,

  async (req, res) => {

    try {

      const bookings =
        await Booking.find()

          .populate("userId")

          .populate("vehicleId");

      // REMOVE BROKEN BOOKINGS

      const validBookings =
        bookings.filter(

          (booking) =>

            booking.vehicleId !== null

        );

      res.status(200).json(
        validBookings
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }

);


// ================= APPROVE BOOKING =================

router.put(

  "/approve/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "owner"
  ),

  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }

      booking.status =
        "approved";

      await booking.save();

      res.status(200).json({

        message:
          "Booking approved successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }

);


// ================= REJECT BOOKING =================

router.put(

  "/reject/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "owner"
  ),

  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }

      booking.status =
        "rejected";

      await booking.save();

      res.status(200).json({

        message:
          "Booking rejected successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }

);


// ================= DELETE BOOKING =================

router.delete(

  "/delete/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "owner"
  ),

  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndDelete(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }

      res.status(200).json({

        message:
          "Booking deleted successfully"

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