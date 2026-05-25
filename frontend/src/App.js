import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";

import { Toaster } from "react-hot-toast";


// PAGES

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddVehicle from "./pages/AddVehicle";

import Bookings from "./pages/Bookings";


// COMPONENTS

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* HOME */}

        <Route

          path="/"

          element={<Home />}

        />

        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}

        />

        {/* REGISTER */}

        <Route

          path="/register"

          element={<Register />}

        />

        {/* DASHBOARD */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />

        {/* ADD VEHICLE */}

        <Route

          path="/add-vehicle"

          element={

            <ProtectedRoute>

              <AddVehicle />

            </ProtectedRoute>

          }

        />

        {/* BOOKINGS */}

        <Route

          path="/bookings"

          element={

            <ProtectedRoute>

              <Bookings />

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;