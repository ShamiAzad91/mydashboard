import React, { useState,useEffect } from "react";
import "../style/Signup.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("sam");
  const [email, setEmail] = useState("sam@test.com");
  const [password, setPassword] = useState("12345");

  const navigate = useNavigate();

useEffect(()=>{
  const auth = localStorage.getItem("user");
  if(auth){
    navigate("/");
  }
})


  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(`hi,.,.. ${name} ,${email},${password} `);
    try {
        let response = await fetch(`http://localhost:8000/api/v1/auth/register`,{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'

            }
        });

        let result = await response.json();
        // console.log("hii",result);


        if(response.ok){
            alert(`${result.user.name}!,${result.message}`);
            navigate("/login");
        }else{
           // Handle backend error message beautifully
  const errorMsg = result?.err || result?.message || "Unable to register. Please try again.";
  
  alert(` Registration Failed!\n\n${errorMsg}`);
        }

        
        
        
    } catch (error) {
       console.error('Network Error:', error);
    alert('Something went wrong. Please try again.');  
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
