const express = require("express");

const Vehicle =
  require("../models/Vehicle");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

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

  async (req, res) => {

    try {

      const {

        name,
        brand,
        type,
        pricePerDay,
        location,
        image

      } = req.body;

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

      res.status(200).json({

        message:
          "Vehicle deleted successfully"

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