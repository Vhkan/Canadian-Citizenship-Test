import '../styles/TopNavBar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function TopNavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  //taking the user's info from the local storage when a user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user"); //username JSON string
    if(user) {
      setIsLoggedIn(true)
      setUsername(JSON.parse(user).username)
    }
  }, []);


  return (
    <div className='top-nav-bar'>
      <a href="/">🍁Canadian Citizenship Test</a>
      <div className='top-nav-links'>
        <a href="/" className='nav-link'>Home</a>
        <a href="/" className='nav-link'>Prepare</a>
        <a href="/"className='nav-link'>About</a>
      </div>
      {isLoggedIn ? (<span className='loggedIn'>Logged in as {username}</span>) : (<Link to="/login" className="login-btn">Login</Link>)}
     
    </div>
  )
}


