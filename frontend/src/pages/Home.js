import {
  useEffect,
  useState
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

import {
  useNavigate
} from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { motion } from "framer-motion";

import ClipLoader from "react-spinners/ClipLoader";

function Home() {

  const navigate =
    useNavigate();

  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  const [locationFilter, setLocationFilter] =
    useState("");

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [startDate, setStartDate] =
    useState(new Date());

  const [endDate, setEndDate] =
    useState(new Date());

  const [showModal, setShowModal] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {

    fetchVehicles();

  }, []);

  const fetchVehicles = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          "https://vehicle-rental-management-system-uto1.onrender.com/api/vehicles"
        );

      setVehicles(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    toast.success(
      "Logged out successfully 👋"
    );

    navigate("/login");

  };

  const handleBooking = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        toast.error(
          "Please login first ❌"
        );

        return;
      }

      const totalDays =
        Math.ceil(
          (endDate - startDate) /
          (1000 * 60 * 60 * 24)
        );

      if (totalDays <= 0) {

        toast.error(
          "Invalid booking dates ❌"
        );

        return;
      }

      await axios.post(

        "https://vehicle-rental-management-system-uto1.onrender.com/api/bookings/create",

        {

          vehicleId:
            selectedVehicle._id,

          startDate,
          endDate

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

      toast.success(
        "Vehicle booked successfully 🚀"
      );

      setShowModal(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Booking failed ❌"
      );

    }

  };

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      return (

        vehicle.name
          .toLowerCase()
          .includes(search.toLowerCase())

        &&

        vehicle.type
          .toLowerCase()
          .includes(typeFilter.toLowerCase())

        &&

        vehicle.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())

      );

    });

  return (

    <div className="bg-[#020817] min-h-screen text-white">

      {/* Responsive Navbar */}

      <nav className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-gray-800 relative">

        <h1 className="text-3xl md:text-4xl font-bold text-blue-500">

          Vehicle Rental

        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex gap-8 text-lg items-center">

          <a
            href="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="/bookings"
            className="hover:text-blue-400 transition"
          >
            Bookings
          </a>

          <a
            href="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </a>

          <a
            href="/add-vehicle"
            className="hover:text-blue-400 transition"
          >
            Add Vehicle
          </a>

          <a
            href="/login"
            className="hover:text-blue-400 transition"
          >
            Login
          </a>

          <button

            onClick={handleLogout}

            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"

          >

            Logout

          </button>

        </div>

        {/* Mobile Menu Button */}

        <button

          onClick={() =>
            setMenuOpen(!menuOpen)
          }

          className="md:hidden text-3xl"

        >

          ☰

        </button>

        {/* Mobile Menu */}

        {menuOpen && (

          <motion.div

            initial={{
              opacity: 0,
              y: -20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="absolute top-20 left-0 w-full bg-[#0f172a] border-t border-gray-800 flex flex-col items-center gap-6 py-8 z-50 md:hidden"

          >

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
              Bookings
            </a>

            <a
              href="/dashboard"
              className="hover:text-blue-400"
            >
              Dashboard
            </a>

            <a
              href="/add-vehicle"
              className="hover:text-blue-400"
            >
              Add Vehicle
            </a>

            <a
              href="/login"
              className="hover:text-blue-400"
            >
              Login
            </a>

            <button

              onClick={handleLogout}

              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl"

            >

              Logout

            </button>

          </motion.div>

        )}

      </nav>

      {/* Hero Section */}

      <div className="text-center py-20 md:py-24 px-4">

        <motion.h1

          initial={{
            opacity: 0,
            y: -50
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          className="text-4xl md:text-7xl font-extrabold"

        >

          Rent Your Dream Car 🚘

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 0.5
          }}

          className="text-gray-400 text-lg md:text-2xl mt-6"

        >

          Fast • Secure • Affordable

        </motion.p>

      </div>

      {/* Vehicles Section */}

      <div className="px-4 md:px-8 pb-16">

        {/* Filters */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <input

            type="text"

            placeholder="Search vehicle..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="bg-gray-900 border border-gray-700 p-4 rounded-xl outline-none"

          />

          <input

            type="text"

            placeholder="Filter by type..."

            value={typeFilter}

            onChange={(e) =>
              setTypeFilter(e.target.value)
            }

            className="bg-gray-900 border border-gray-700 p-4 rounded-xl outline-none"

          />

          <input

            type="text"

            placeholder="Filter by location..."

            value={locationFilter}

            onChange={(e) =>
              setLocationFilter(e.target.value)
            }

            className="bg-gray-900 border border-gray-700 p-4 rounded-xl outline-none"

          />

        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-12">

          Available Vehicles

        </h2>

        {loading ? (

          <div className="flex justify-center items-center py-20">

            <ClipLoader
              color="#3B82F6"
              size={80}
            />

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredVehicles.map((vehicle) => (

              <motion.div

                key={vehicle._id}

                initial={{
                  opacity: 0,
                  y: 50
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  duration: 0.5
                }}

                whileHover={{
                  scale: 1.05
                }}

                className="bg-[#0f172a] rounded-3xl overflow-hidden shadow-lg border border-gray-800"

              >

                <img

                  src={
                    vehicle.image ||
                    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                  }

                  alt={vehicle.name}

                  className="w-full h-56 object-cover"

                />

                <div className="p-6">

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">

                    {vehicle.name}

                  </h2>

                  <div className="space-y-3 text-base md:text-lg">

                    <p>
                      Brand:
                      {" "}
                      <span className="text-gray-300">
                        {vehicle.brand}
                      </span>
                    </p>

                    <p>
                      Type:
                      {" "}
                      <span className="text-gray-300">
                        {vehicle.type}
                      </span>
                    </p>

                    <p>
                      Price:
                      {" "}
                      <span className="text-green-400 font-bold">
                        ₹{vehicle.pricePerDay}/day
                      </span>
                    </p>

                    <p>
                      Location:
                      {" "}
                      <span className="text-gray-300">
                        {vehicle.location}
                      </span>
                    </p>

                  </div>

                  <button

                    onClick={() => {

                      setSelectedVehicle(vehicle);

                      setShowModal(true);

                    }}

                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold text-lg"

                  >

                    Book Now

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

      {/* Booking Modal */}

      {showModal && selectedVehicle && (

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4"

        >

          <motion.div

            initial={{
              scale: 0.8,
              opacity: 0
            }}

            animate={{
              scale: 1,
              opacity: 1
            }}

            className="bg-gray-900 p-8 rounded-3xl w-full max-w-md border border-gray-800"

          >

            <h2 className="text-2xl md:text-3xl font-bold mb-6">

              Book {selectedVehicle.name}

            </h2>

            <div className="space-y-5">

              <div>

                <label className="block mb-2">

                  Start Date

                </label>

                <DatePicker

                  selected={startDate}

                  onChange={(date) =>
                    setStartDate(date)
                  }

                  className="w-full bg-gray-800 p-3 rounded-xl text-white"

                />

              </div>

              <div>

                <label className="block mb-2">

                  End Date

                </label>

                <DatePicker

                  selected={endDate}

                  onChange={(date) =>
                    setEndDate(date)
                  }

                  className="w-full bg-gray-800 p-3 rounded-xl text-white"

                />

              </div>

              <div className="pt-4">

                <button

                  onClick={handleBooking}

                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"

                >

                  Confirm Booking 🚀

                </button>

                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="w-full mt-3 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl"

                >

                  Cancel

                </button>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

      {/* Footer */}

      <footer className="border-t border-gray-800 mt-20">

        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-blue-500">

              Vehicle Rental

            </h2>

            <p className="text-gray-400 mt-4 leading-7">

              Premium vehicle rental platform
              built with MERN Stack,
              Tailwind CSS and modern UI.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="text-xl font-semibold mb-4">

              Quick Links

            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

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
                Bookings
              </a>

              <a
                href="/dashboard"
                className="hover:text-blue-400"
              >
                Dashboard
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-4">

              Contact

            </h3>

            <div className="text-gray-400 space-y-3">

              <p>
                📍 Chandigarh University
              </p>

              <p>
                📧 support@vehiclerental.com
              </p>

              <p>
                📞 +91 9876543210
              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-800 py-5 text-center text-gray-500">

          © 2026 Vehicle Rental Management System.
          All Rights Reserved.

        </div>

      </footer>

    </div>

  );

}

export default Home;