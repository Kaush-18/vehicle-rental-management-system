import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { motion } from "framer-motion";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      role: "user"

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

      await axios.post(

        "https://vehicle-rental-backend.onrender.com/api/auth/register",

        formData

      );

      toast.success(
        "Registration Successful 🚀"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration Failed ❌"
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

          Create Account 🚀

        </h1>

        <p className="text-gray-400 text-center mb-8">

          Join the vehicle rental platform

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input

            type="text"

            name="name"

            placeholder="Enter name"

            onChange={handleChange}

            className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl text-white outline-none"

          />

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

          <select

            name="role"

            onChange={handleChange}

            className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl text-white outline-none"

          >

            <option value="user">

              User

            </option>

            <option value="owner">

              Owner

            </option>

            <option value="admin">

              Admin

            </option>

          </select>

          <button

            type="submit"

            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl font-semibold text-lg"

          >

            Register

          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">

          Already have an account?

          {" "}

          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >

            Login

          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Register;