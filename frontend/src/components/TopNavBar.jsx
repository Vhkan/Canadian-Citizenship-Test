import '../styles/TopNavBar.css'

export default function TopNavBar() {
  return (
    <div className='top-nav-bar'>
      <a href="/">🍁Canadian Citizenship Test</a>
      <div className='top-nav-links'>
        <a href="/" className='nav-link'>Home</a>
        <a href="/" className='nav-link'>Prepare</a>
        <a href="/"className='nav-link'>About</a>
      </div>
      <button className='login-btn'>Login</button>
    </div>
  )
}


