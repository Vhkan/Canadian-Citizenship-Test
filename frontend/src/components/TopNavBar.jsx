import '../styles/TopNavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function TopNavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //taking the user's info from the local storage when a user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user"); //username JSON string
    console.log("logged in user is:", user);
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true)
      setUsername(userData.username);
      console.log("Username is: ", userData.username);
    }
  }, [location]);

  
  //logout funcitonality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate('/');
  };


  return (
    <div className='top-nav-bar'>
      <a href="/">🍁Canadian Citizenship Test</a>
      <div className='top-nav-links'>
        <a href="/" className='nav-link'>Home</a>
        <a href="/" className='nav-link'>Prepare</a>
        <a href="/"className='nav-link'>About</a>
        </div>
      {isLoggedIn ? (
        <div>
          <span className='loggedIn'>Logged in as {username}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="login-btn">Login</button>
      )}
    </div>
  )
}


