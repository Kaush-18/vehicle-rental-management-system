import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route

          path="/bookings"

          element={

            <ProtectedRoute>

              <Bookings />

            </ProtectedRoute>

          }

        />

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />

        <Route

          path="/add-vehicle"

          element={

            <ProtectedRoute>

              <AddVehicle />

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;