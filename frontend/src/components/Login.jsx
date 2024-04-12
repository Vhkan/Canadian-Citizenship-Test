import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

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
      throw new Error(data.message || "An error occurred during login.");
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
    <div>
      <h3>Login if you are a registered user👇</h3>
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
        <Button type="submit" className="login-btn">Login</Button>
        <h3>Register here 👇</h3>
        <Button onClick={() => navigate("/register")} className="register-btn">Register</Button>
      </form>
    </div>
  );
};


export default Login;