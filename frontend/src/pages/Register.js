import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/register",

        formData

      );

      alert(response.data.message);

    } catch (error) {

      alert("Registration failed");
        console.log(error);

    }

  };

  return (

    <div style={{
      padding: "20px"
    }}>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;