import React, { useState, useEffect } from "react";
import "../style/Signup.css"; // using same CSS for now
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("ayan@test.com");
  const [password, setPassword] = useState("12345");
  const navigate = useNavigate();

  useEffect(()=>{
 const auth = localStorage.getItem("user");
 if(auth){
    navigate("/");
 }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email,password)
    try {
      let response = await fetch(`http://localhost:8000/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      

      // console.log(`hiiss`,response);
      //   console.log(`hii`, result);
      //   console.log("shami", result.token);

      if (response.ok) {
        alert(`${result.user.name},${result.message}`);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("auth", result.token);
        navigate("/");
      }else{
      const errorMsg = result?.err || result?.message || "Unable to login. Please try again.";
  
  alert(` lOGIN Failed!\n\n${errorMsg}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
