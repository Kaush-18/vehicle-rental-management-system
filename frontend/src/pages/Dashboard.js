import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const response =
        await axios.get(
          "https://vehicle-rental-management-system-uto1.onrender.com/api/bookings"
        );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const approveBooking = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/approve/${id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

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

  const rejectBooking = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/reject/${id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

      toast.success(
        "Booking Rejected ❌"
      );

      fetchBookings();

    } catch (error) {

      console.log(error);

      toast.error(
        "Rejection Failed ❌"
      );

    }

  };

  const deleteVehicle = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles/delete/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

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

      {/* Navbar */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-blue-500">

          Owner Dashboard

        </h1>

        <div className="flex gap-6">

          <a
            href="/"
            className="hover:text-blue-400"
          >
            Home
          </a>

          <a
            href="/bookings"
            className="hover:text-blue-400"
          >
            My Bookings
          </a>

        </div>

      </div>

      {/* Heading */}

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-3">

          Booking Management 📊

        </h1>

        <p className="text-gray-400 text-lg">

          Approve, reject or delete vehicles

        </p>

      </div>

      {/* Booking Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-20">

        {bookings.map((booking) => (

          <div

            key={booking._id}

            className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl"

          >

            <img

              src={
                booking.vehicleId?.image ||

                "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              }

              alt="vehicle"

              className="w-full h-56 object-cover"

            />

            <div className="p-6">

              <h2 className="text-3xl font-bold">

                {booking.vehicleId?.name}

              </h2>

              <p className="text-gray-400 mt-2">

                {booking.vehicleId?.brand}

              </p>

              <div className="mt-5 space-y-2">

                <p>

                  👤 User:
                  {" "}

                  <span className="text-gray-300">

                    {booking.userId?.name}

                  </span>

                </p>

                <p>

                  💰 Price:
                  {" "}

                  <span className="text-green-400">

                    ₹{booking.totalPrice}

                  </span>

                </p>

                <p>

                  🚦 Status:
                  {" "}

                  <span className="text-yellow-400">

                    {booking.status}

                  </span>

                </p>

              </div>

              <div className="flex gap-4 mt-6">

                <button

                  onClick={() =>
                    approveBooking(booking._id)
                  }

                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"

                >

                  Approve

                </button>

                <button

                  onClick={() =>
                    rejectBooking(booking._id)
                  }

                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"

                >

                  Reject

                </button>

              </div>

              <button

                onClick={() =>
                  deleteVehicle(
                    booking.vehicleId?._id
                  )
                }

                className="w-full mt-4 bg-red-800 hover:bg-red-900 py-3 rounded-xl font-semibold transition"

              >

                Delete Vehicle 🗑️

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;