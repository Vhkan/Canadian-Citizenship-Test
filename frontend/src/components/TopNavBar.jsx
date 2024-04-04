import '../styles/TopNavBar.css'
import { Link } from 'react-router-dom'

export default function TopNavBar() {
  return (
    <div className='top-nav-bar'>
      <a href="/">🍁Canadian Citizenship Test</a>
      <div className='top-nav-links'>
        <a href="/" className='nav-link'>Home</a>
        <a href="/" className='nav-link'>Prepare</a>
        <a href="/"className='nav-link'>About</a>
      </div>
      <Link to="/login" className="login-btn">Login</Link>
    </div>
  )
}


