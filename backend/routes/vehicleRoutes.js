const express = require("express");

const Vehicle =
  require("../models/Vehicle");

const Booking =
  require("../models/Booking");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/upload");

const router = express.Router();


// ================= GET ALL VEHICLES =================

router.get(

  "/",

  async (req, res) => {

    try {

      const vehicles =
        await Vehicle.find();

      res.status(200).json(
        vehicles
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }

);


// ================= ADD VEHICLE =================

router.post(

  "/add",

  authMiddleware,

  roleMiddleware(
    "admin",
    "owner"
  ),

  upload.single("image"),

  async (req, res) => {

    try {

      const {

        name,
        brand,
        type,
        pricePerDay,
        location

      } = req.body;

      // CLOUDINARY IMAGE

      const image =
        req.file.path;

      const vehicle =
        await Vehicle.create({

          name,
          brand,
          type,
          pricePerDay,
          location,
          image

        });

      res.status(201).json({

        message:
          "Vehicle added successfully",

        vehicle

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }

  }

);


// ================= DELETE VEHICLE =================

router.delete(

  "/delete/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "owner"
  ),

  async (req, res) => {

    try {

      console.log(
        "DELETE ROUTE HIT:",
        req.params.id
      );

      // DELETE VEHICLE

      const vehicle =
        await Vehicle.findByIdAndDelete(
          req.params.id
        );

      if (!vehicle) {

        return res.status(404).json({

          message:
            "Vehicle not found"

        });

      }

      // DELETE RELATED BOOKINGS

      await Booking.deleteMany({

        vehicleId:
          req.params.id

      });

      res.status(200).json({

        message:
          "Vehicle and related bookings deleted successfully"

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