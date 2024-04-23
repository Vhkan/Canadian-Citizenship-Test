import '../styles/TopNavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';


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

  //highlight the link the user is on now
  const activeLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className='top-nav-bar'>
      <div>
      <a href="/" className='top_nav_logo-link'>
            <FontAwesomeIcon icon={faCanadianMapleLeaf} color="#c22020" size="lg" /> 
            Canadian Citizenship Test
        </a>
      </div>      
      <div className='top-nav-links'>
        <a href="/" className={`nav-link ${activeLinkClass('/')}`}>Home</a>
        <a href="/prepare" className={`nav-link ${activeLinkClass('/prepare')}`}>Prepare</a>
        <a href="/about" className={`nav-link ${activeLinkClass('/about')}`}>About</a>
        <a href="/test" className={`nav-link ${activeLinkClass('/test')}`}>Test</a>
      </div>
      {isLoggedIn ? (
        <div>
          <span className='loggedIn'>Logged in as {username}</span>
          <Button onClick={handleLogout} className="logout-btn" variant='secondary'>Logout</Button>
        </div>
      ) : (
        <Button variant="outline-secondary" onClick={() => navigate("/login")} className="login-btn">Login</Button>
      )}
    </div>
  )
}


