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

      // USER BOOKINGS ONLY

      if (user.role === "user") {

        const userBookings =
          response.data.filter(

            (booking) =>

              booking.user?._id === user._id

          );

        setBookings(userBookings);

      }

      // OWNER / ADMIN

      else {

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

      toast.error(
        "Approval Failed ❌"
      );

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

      toast.error(
        "Reject Failed ❌"
      );

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

      // REMOVE FROM UI

      setBookings(

        bookings.filter(

          (booking) =>

            booking.vehicle?._id !== vehicleId

        )

      );

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

          {

            user.role === "user"

              ? "User Dashboard 👤"

              : "Owner Dashboard 📊"

          }

        </h1>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>

          {

            (user.role === "owner" ||

             user.role === "admin")

            && (

              <Link
                to="/add-vehicle"
                className="hover:text-blue-400"
              >
                Add Vehicle
              </Link>

            )

          }

        </div>

      </div>

      {/* HEADER */}

      <div className="p-10">

        {

          user.role === "user"

          && (

            <div className="mb-10">

              <h1 className="text-5xl font-bold mb-3">

                My Bookings 🚗

              </h1>

              <p className="text-gray-400">

                Track your bookings here.

              </p>

            </div>

          )

        }

        {

          (user.role === "owner" ||

           user.role === "admin")

          && (

            <div className="mb-10">

              <h1 className="text-5xl font-bold mb-3">

                Booking Management 📊

              </h1>

              <p className="text-gray-400">

                Approve, reject or delete vehicles

              </p>

            </div>

          )

        }

        {/* EMPTY STATE */}

        {

          bookings.length === 0

          && (

            <div className="text-center text-gray-400 mt-20">

              <h1 className="text-3xl font-bold">

                No bookings found 🚘

              </h1>

            </div>

          )

        }

        {/* BOOKINGS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            bookings.map((booking) => (

              <div

                key={booking._id}

                className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-lg"

              >

                <img

                  src={booking.vehicle?.image}

                  alt="vehicle"

                  className="w-full h-64 object-cover"

                />

                <div className="p-6">

                  <h1 className="text-3xl font-bold mb-2">

                    {booking.vehicle?.name}

                  </h1>

                  <p className="text-gray-400 mb-4">

                    {booking.vehicle?.brand}

                  </p>

                  {

                    (user.role === "owner" ||

                     user.role === "admin")

                    && (

                      <p className="mb-2">

                        👤 User:

                        {" "}

                        {booking.user?.name}

                      </p>

                    )

                  }

                  <p className="mb-2 text-green-400 font-semibold">

                    💰 Price:

                    {" "}

                    ₹{booking.vehicle?.pricePerDay}

                  </p>

                  {/* STATUS */}

                  <p className="mb-4 font-semibold">

                    📍 Status:

                    <span

                      className={`ml-2 ${
                        booking.status === "approved"
                          ? "text-green-400"
                          : booking.status === "rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}

                    >

                      {booking.status}

                    </span>

                  </p>

                  {/* APPROVE / REJECT */}

                  {

                    (user.role === "owner" ||

                     user.role === "admin")

                    &&

                    booking.status === "pending"

                    && (

                      <div className="flex gap-3 mb-4">

                        <button

                          onClick={() =>
                            approveBooking(
                              booking._id
                            )
                          }

                          className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"

                        >

                          Approve

                        </button>

                        <button

                          onClick={() =>
                            rejectBooking(
                              booking._id
                            )
                          }

                          className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"

                        >

                          Reject

                        </button>

                      </div>

                    )

                  }

                  {/* DELETE VEHICLE */}

                  {

                    (user.role === "owner" ||

                     user.role === "admin")

                    && (

                      <button

                        onClick={() => {

                          if (booking.vehicle?._id) {

                            deleteVehicle(
                              booking.vehicle._id
                            );

                          }

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