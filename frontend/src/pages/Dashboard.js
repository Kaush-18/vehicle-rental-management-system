import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

function Dashboard() {

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  // ================= FETCH BOOKINGS =================

  const fetchBookings = async () => {

    try {

      const response =
        await axios.get(

          "https://vehicle-rental-management-system-uto1.onrender.com/api/bookings",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );

      if (user.role === "user") {

        const userBookings =
          response.data.filter(

            (booking) =>

              booking.userId?._id === user._id

          );

        setBookings(userBookings);

      } else {

        setBookings(response.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // ================= APPROVE BOOKING =================

  const approveBooking = async (id) => {

    try {

      await axios.put(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/approve/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success(
        "Booking Approved ✅"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= REJECT BOOKING =================

  const rejectBooking = async (id) => {

    try {

      await axios.put(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/reject/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success(
        "Booking Rejected ❌"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE VEHICLE =================

  const deleteVehicle = async (vehicleId) => {

    try {

      console.log(
        "DELETE VEHICLE ID:",
        vehicleId
      );

      await axios.delete(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles/delete/${vehicleId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success(
        "Vehicle Deleted 🗑️"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-blue-500">

          Dashboard 📊

        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/add-vehicle"
            className="hover:text-blue-400"
          >
            Add Vehicle
          </Link>

        </div>

      </div>

      {/* BOOKINGS */}

      <div className="p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            bookings.map((booking) => (

              <div

                key={booking._id}

                className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800"

              >

                <img

                  src={booking.vehicleId?.image}

                  alt="vehicle"

                  className="w-full h-64 object-cover"

                />

                <div className="p-6">

                  <h1 className="text-3xl font-bold mb-2">

                    {booking.vehicleId?.name}

                  </h1>

                  <p className="text-gray-400 mb-2">

                    {booking.vehicleId?.brand}

                  </p>

                  <p className="mb-2">

                    👤 User:

                    {" "}

                    {booking.userId?.name}

                  </p>

                  <p className="mb-4">

                    Status:

                    {" "}

                    <span className="text-yellow-400">

                      {booking.status}

                    </span>

                  </p>

                  {

                    booking.status === "pending"

                    && user.role !== "user"

                    && (

                      <div className="flex gap-3 mb-4">

                        <button

                          onClick={() =>
                            approveBooking(
                              booking._id
                            )
                          }

                          className="flex-1 bg-green-600 py-3 rounded-xl"

                        >

                          Approve

                        </button>

                        <button

                          onClick={() =>
                            rejectBooking(
                              booking._id
                            )
                          }

                          className="flex-1 bg-red-600 py-3 rounded-xl"

                        >

                          Reject

                        </button>

                      </div>

                    )

                  }

                  {

                    user.role !== "user"

                    && (

                      <button

                        onClick={() => {

                          console.log(
                            "DELETE ID:",
                            booking.vehicleId?._id
                          );

                          deleteVehicle(
                            booking.vehicleId?._id
                          );

                        }}

                        className="w-full bg-red-800 hover:bg-red-900 py-3 rounded-xl font-semibold"

                      >

                        Delete Vehicle 🗑️

                      </button>

                    )

                  }

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;