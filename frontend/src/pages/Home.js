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