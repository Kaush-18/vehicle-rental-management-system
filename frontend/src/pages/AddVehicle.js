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
      image: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");
      console.log(token);

await axios.post(
  "https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles/add",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      toast.success(
        "Vehicle Added 🚗"
      );

      setFormData({

        name: "",
        brand: "",
        type: "",
        pricePerDay: "",
        location: "",
        image: ""

      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to Add Vehicle ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-blue-500">

          Add Vehicle

        </h1>

        <a
          href="/dashboard"
          className="hover:text-blue-400"
        >
          Dashboard
        </a>

      </div>

      {/* Form */}

      <div className="flex justify-center items-center py-20">

        <form

          onSubmit={handleSubmit}

          className="bg-gray-900 p-10 rounded-3xl w-full max-w-2xl border border-gray-800 shadow-xl"

        >

          <h1 className="text-4xl font-bold mb-8">

            Add New Vehicle 🚘

          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Vehicle Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

            <input
              type="number"
              name="pricePerDay"
              placeholder="Price Per Day"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="bg-gray-800 p-4 rounded-xl outline-none"
            />

          </div>

          <button

            type="submit"

            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-lg font-semibold transition"

          >

            Add Vehicle

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddVehicle;