import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {

  Link,

  useNavigate

} from "react-router-dom";

function Home() {

  const [vehicles, setVehicles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  const [locationFilter, setLocationFilter] =
    useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    toast.success(
      "Logged out successfully 👋"
    );

    navigate("/login");

  };

  // FETCH VEHICLES

  const fetchVehicles = async () => {

    try {

      const response =
        await axios.get(

          "https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles"

        );

      setVehicles(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchVehicles();

  }, []);

  // BOOK VEHICLE

  const bookVehicle = async (vehicleId) => {

    try {

      if (!token) {

        toast.error(
          "Please login first"
        );

        navigate("/login");

        return;

      }

      await axios.post(

        "https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/book",

        {
          vehicleId
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success(
        "Vehicle booked successfully 🚗"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Booking failed ❌"
      );

    }

  };

  // FILTER VEHICLES

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      return (

        vehicle.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        vehicle.type
          .toLowerCase()
          .includes(
            typeFilter.toLowerCase()
          )

        &&

        vehicle.location
          .toLowerCase()
          .includes(
            locationFilter.toLowerCase()
          )

      );

    });

  return (

    <div className="min-h-screen bg-[#020817] text-white">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800">

        {/* LOGO */}

        <h1 className="text-4xl font-bold text-blue-500">

          Vehicle Rental

        </h1>

        {/* NAV LINKS */}

        <div className="flex items-center gap-6 text-lg">

          {/* HOME */}

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          {/* USER BOOKINGS */}

          {

            user?.role === "user"

            && (

              <Link
                to="/bookings"
                className="hover:text-blue-400 transition"
              >
                Bookings
              </Link>

            )

          }

          {/* OWNER / ADMIN DASHBOARD */}

          {

            (user?.role === "owner" ||

             user?.role === "admin")

            && (

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

            )

          }

          {/* ADD VEHICLE */}

          {

            (user?.role === "owner" ||

             user?.role === "admin")

            && (

              <Link
                to="/add-vehicle"
                className="hover:text-blue-400 transition"
              >
                Add Vehicle
              </Link>

            )

          }

          {/* LOGIN */}

          {

            !user && (

              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

            )

          }

          {/* REGISTER */}

          {

            !user && (

              <Link
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Register
              </Link>

            )

          }

          {/* LOGOUT */}

          {

            user && (

              <button

                onClick={logout}

                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl transition"

              >

                Logout

              </button>

            )

          }

        </div>

      </div>

      {/* HERO SECTION */}

      <div className="text-center py-24 px-5">

        <h1 className="text-7xl font-extrabold mb-6">

          Rent Your Dream Car 🚘

        </h1>

        <p className="text-3xl text-gray-400">

          Fast • Secure • Affordable

        </p>

      </div>

      {/* SEARCH FILTERS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 mb-16">

        <input

          type="text"

          placeholder="Search vehicle..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="bg-gray-900 border border-gray-700 p-5 rounded-2xl outline-none"

        />

        <input

          type="text"

          placeholder="Filter by type..."

          value={typeFilter}

          onChange={(e) =>
            setTypeFilter(
              e.target.value
            )
          }

          className="bg-gray-900 border border-gray-700 p-5 rounded-2xl outline-none"

        />

        <input

          type="text"

          placeholder="Filter by location..."

          value={locationFilter}

          onChange={(e) =>
            setLocationFilter(
              e.target.value
            )
          }

          className="bg-gray-900 border border-gray-700 p-5 rounded-2xl outline-none"

        />

      </div>

      {/* VEHICLES */}

      <div className="px-10 pb-20">

        <h1 className="text-6xl font-bold mb-12">

          Available Vehicles

        </h1>

        {

          filteredVehicles.length === 0

          && (

            <div className="text-center text-gray-400">

              <h1 className="text-3xl font-bold">

                No vehicles found 🚫

              </h1>

            </div>

          )

        }

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {

            filteredVehicles.map((vehicle) => (

              <div

                key={vehicle._id}

                className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"

              >

                <img

                  src={vehicle.image}

                  alt={vehicle.name}

                  className="w-full h-72 object-cover"

                />

                <div className="p-6">

                  <h1 className="text-4xl font-bold mb-3">

                    {vehicle.name}

                  </h1>

                  <p className="text-gray-400 mb-2">

                    Brand:

                    {" "}

                    {vehicle.brand}

                  </p>

                  <p className="text-gray-400 mb-2">

                    Type:

                    {" "}

                    {vehicle.type}

                  </p>

                  <p className="text-gray-400 mb-2">

                    Location:

                    {" "}

                    {vehicle.location}

                  </p>

                  <p className="text-green-400 text-2xl font-bold mb-6">

                    ₹{vehicle.pricePerDay}/day

                  </p>

                  {/* BOOK BUTTON */}

                  {

                    user?.role === "user"

                    && (

                      <button

                        onClick={() =>
                          bookVehicle(
                            vehicle._id
                          )
                        }

                        className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-semibold transition"

                      >

                        Book Now 🚗

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

export default Home;