import { useState } from "react";
import axios from "axios";

function Login() {

  const [formData, setFormData] = useState({

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

        "http://localhost:5000/api/auth/login",

        formData

      );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login successful");
      

      console.log(response.data);

    } catch (error) {

      alert("Login failed");

      console.log(error);

    }

  };

  return (

    <div style={{
      padding: "20px"
    }}>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;