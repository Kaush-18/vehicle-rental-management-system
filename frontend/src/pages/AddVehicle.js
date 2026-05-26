import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

function AddVehicle() {

  const [formData, setFormData] =
    useState({

      name: "",
      brand: "",
      type: "",
      pricePerDay: "",
      location: "",
      image: null

    });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // ================= HANDLE IMAGE =================

  const handleImageChange = (e) => {

    setFormData({

      ...formData,

      image:
        e.target.files[0]

    });

  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "brand",
        formData.brand
      );

      data.append(
        "type",
        formData.type
      );

      data.append(
        "pricePerDay",
        formData.pricePerDay
      );

      data.append(
        "location",
        formData.location
      );

      data.append(
        "image",
        formData.image
      );

      await axios.post(

        "https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles/add",

        data,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",

          },
        }

      );

      toast.success(
        "Vehicle Added Successfully 🚗"
      );

      // RESET FORM

      setFormData({

        name: "",
        brand: "",
        type: "",
        pricePerDay: "",
        location: "",
        image: null

      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to Add Vehicle ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-5">

      <form

        onSubmit={handleSubmit}

        className="bg-gray-900 p-10 rounded-3xl w-full max-w-2xl border border-gray-800 shadow-2xl"

      >

        <h1 className="text-5xl font-bold mb-10 text-center">

          Add Vehicle 🚘

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}

          <input

            type="text"

            name="name"

            placeholder="Vehicle Name"

            value={formData.name}

            onChange={handleChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

          {/* BRAND */}

          <input

            type="text"

            name="brand"

            placeholder="Brand"

            value={formData.brand}

            onChange={handleChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

          {/* TYPE */}

          <input

            type="text"

            name="type"

            placeholder="Type"

            value={formData.type}

            onChange={handleChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

          {/* PRICE */}

          <input

            type="number"

            name="pricePerDay"

            placeholder="Price Per Day"

            value={formData.pricePerDay}

            onChange={handleChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

          {/* LOCATION */}

          <input

            type="text"

            name="location"

            placeholder="Location"

            value={formData.location}

            onChange={handleChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

          {/* IMAGE */}

          <input

            type="file"

            accept="image/*"

            onChange={handleImageChange}

            className="bg-gray-800 p-4 rounded-xl outline-none"

            required

          />

        </div>

        {/* BUTTON */}

        <button

          type="submit"

          className="w-full mt-10 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-xl font-semibold transition"

        >

          Add Vehicle 🚗

        </button>

      </form>

    </div>

  );

}

export default AddVehicle;