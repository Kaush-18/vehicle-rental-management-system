import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { motion } from "framer-motion";

function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",
      password: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(

          "https://vehicle-rental-management-system-uto1.onrender.com/api/auth/login",

          formData

        );

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        response.data.token

      );

      // SAVE USER

      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.user
        )

      );

      toast.success(
        "Login Successful 🚀"
      );

      const userRole =
        response.data.user.role;

      // ROLE BASED REDIRECT

      if (

        userRole === "admin"

        ||

        userRole === "owner"

      ) {

        navigate("/dashboard");

      } else {

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Login Failed ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#020817] flex justify-center items-center px-4">

      <motion.div

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="bg-[#0f172a] w-full max-w-md p-8 rounded-3xl border border-gray-800 shadow-2xl"

      >

        <h1 className="text-4xl font-bold text-center text-white mb-2">

          Welcome Back 🔥

        </h1>

        <p className="text-gray-400 text-center mb-8">

          Login to continue

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input

            type="email"

            name="email"

            placeholder="Enter email"

            onChange={handleChange}

            className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl text-white outline-none"

          />

          <input

            type="password"

            name="password"

            placeholder="Enter password"

            onChange={handleChange}

            className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl text-white outline-none"

          />

          <button

            type="submit"

            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl font-semibold text-lg"

          >

            Login

          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">

          Don't have an account?

          {" "}

          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >

            Register

          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Login;