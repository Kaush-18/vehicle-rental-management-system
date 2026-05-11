import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          "http://localhost:5000/api/bookings/my-bookings",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}

      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-blue-500">

          Vehicle Rental

        </h1>

        <div className="flex gap-6 text-lg">

          <a
            href="/"
            className="hover:text-blue-400"
          >
            Home
          </a>

          <a
            href="/bookings"
            className="text-blue-400"
          >
            Bookings
          </a>

        </div>

      </div>

      {/* Heading */}

      <div className="px-10 pt-14">

        <h1 className="text-5xl font-bold mb-3">

          My Bookings 📅

        </h1>

        <p className="text-gray-400 text-lg">

          Manage all your vehicle bookings here

        </p>

      </div>

      {/* Empty State */}

      {bookings.length === 0 && (

        <div className="flex flex-col items-center justify-center mt-32">

          <h2 className="text-3xl font-bold text-gray-300">

            No Bookings Yet 😔

          </h2>

          <p className="text-gray-500 mt-3">

            Book your first vehicle now

          </p>

        </div>

      )}

      {/* Booking Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">

        {bookings.map((booking) => (

          <div

            key={booking._id}

            className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"

          >

            {/* Image */}

            <img

              src={
                booking.vehicleId?.image ||

                "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              }

              alt="vehicle"

              className="w-full h-56 object-cover"

            />

            {/* Content */}

            <div className="p-6">

              <h2 className="text-3xl font-bold">

                {booking.vehicleId?.name}

              </h2>

              <p className="text-gray-400 mt-2">

                {booking.vehicleId?.brand}

              </p>

              <div className="mt-6 space-y-3 text-gray-300">

                <p>

                  📅 Start Date:
                  <span className="text-white ml-2">

                    {booking.startDate?.substring(0, 10)}

                  </span>

                </p>

                <p>

                  🛑 End Date:
                  <span className="text-white ml-2">

                    {booking.endDate?.substring(0, 10)}

                  </span>

                </p>

                <p>

                  💰 Total Price:
                  <span className="text-green-400 ml-2">

                    ₹{booking.totalPrice}

                  </span>

                </p>

                <p>

                  🚦 Status:

                  <span

                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold

                    ${booking.status === "approved"
                      ? "bg-green-500/20 text-green-400"
                      : booking.status === "rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }`}

                  >

                    {booking.status}

                  </span>

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Bookings;