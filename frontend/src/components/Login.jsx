import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  //redirection 
  const navigate = useNavigate();

  const loginHandler = (e) => {
    const newUserLogin = {
      //keeping the previous user login info
      ...userLogin,
      [e.target.name]: e.target.value  //handling form inputs dynamically
    }
    setUserLogin(newUserLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:9000/login";
    const settings = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    };

    const response = await fetch(URL, settings); //settings obj to keep the info typed
    const data = await response.json();
  
    if(!response.ok) {
      setErrorMessage(data.message);
      navigate("/register")
    } else {
       localStorage.setItem("token", data.token);
       setErrorMessage("");
       navigate("/test");
    }
  }
  
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email⚡</label>
          <input id="email" type="email" name="email" value={userLogin.email} onChange={loginHandler} />
        </div>

        <div>
          <label htmlFor="email">Password⚡</label>
          <input id="password" type="password" name="password" value={userLogin.password} onChange={loginHandler} />
        </div>
        <div>{errorMessage}</div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;