import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="logo">Zot Market</h1>
      </Link>
      <div className="auth-links">
        <Link to="/login" className="auth-link">
          Sign In
        </Link>
        <Link to="/register" className="auth-link">
          Join
        </Link>
      </div>
    </header>
  )
}

export default Header
