import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";

import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "react-hot-toast";

function App() {

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED DASHBOARD */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />

        {/* OWNER + ADMIN ONLY */}

        <Route

          path="/add-vehicle"

          element={

            <ProtectedRoute

              allowedRoles={[
                "admin",
                "owner"
              ]}

            >

              <AddVehicle />

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;