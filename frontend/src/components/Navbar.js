import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800 bg-gray-950 text-white">

      {/* LOGO */}

      <h1 className="text-3xl font-bold text-blue-500">

        Vehicle Rental 🚗

      </h1>

      {/* NAV LINKS */}

      <div className="flex gap-6 items-center">

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
              My Bookings
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

        {/* USER INFO */}

        {

          user && (

            <div className="flex items-center gap-3">

              <span className="bg-gray-800 px-4 py-2 rounded-xl text-sm">

                {

                  user.name

                }

                {" "}

                (

                {

                  user.role

                }

                )

              </span>

              <button

                onClick={logout}

                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition"

              >

                Logout

              </button>

            </div>

          )

        }

        {/* LOGIN / REGISTER */}

        {

          !user && (

            <>

              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Register
              </Link>
            </>

          )

        }

      </div>

    </div>

  );

}

export default Navbar;