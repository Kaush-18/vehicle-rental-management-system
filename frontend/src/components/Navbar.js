import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav style={{
      padding: "15px",
      background: "black"
    }}>

      <Link
        to="/"
        style={{
          color: "white",
          marginRight: "15px"
        }}
      >
        Home
      </Link>

      <Link
        to="/login"
        style={{
          color: "white",
          marginRight: "15px"
        }}
      >
        Login
      </Link>

      <Link
        to="/register"
        style={{
          color: "white",
          marginRight: "15px"
        }}
      >
        Register
      </Link>

      <Link
        to="/dashboard"
        style={{
          color: "white",
          marginRight: "15px"
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/bookings"
        style={{
          color: "white"
        }}
      >
        Bookings
      </Link>

    </nav>

  );

}

export default Navbar;