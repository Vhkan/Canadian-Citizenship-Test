import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styles/Login.css'

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
      //keeping the previous userlogin info
      ...userLogin, [e.target.name]: e.target.value  //handling form inputs dynamically
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

    try {
    const response = await fetch(URL, settings); //settings obj to keep the info typed
    const data = await response.json();
    console.log("Data object (token info):", data);

    if(!response.ok) {
      throw new Error(data.message || "An error occurred during login."); //invalid user credentials
    } 
    //savin token and username to local storage
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify({ username: data.username }));
       setErrorMessage("");
      //  navigate("/test");
      navigate("/test", { replace: true, state: { loggedIn: true } });

    } catch(error) {
      setErrorMessage(error.message);
    }
  };

  
  return (
    <div className="login-form">
      <h5 className="login-your-account">Login in to your account</h5>
      <form onSubmit={handleLogin}>
        <div>
          <label className="email-label" htmlFor="email">Email</label>
          <input className="login-input" id="email" type="email" name="email" value={userLogin.email} onChange={loginHandler} />
        </div>

        <div>
          <label className="password-label" htmlFor="email">Password</label>
          <input className="password-input" id="password" type="password" name="password" value={userLogin.password} onChange={loginHandler} />
        </div>
        <div>{errorMessage}</div>
        <Button type="submit" className="login-input-btn" variant="outline-secondary">Login</Button>
        <h5 className="register-here"> Don't have an account? Register here.</h5>
        <Button onClick={() => navigate("/register")} className="register-btn" variant="outline-secondary">Register</Button>
      </form>
    </div>
  );
};


export default Login;