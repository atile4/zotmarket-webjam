import { Link } from "react-router-dom";
import Header from "../components/Header";

function Register() {
  return (
    <>
      <Header />

      <div className="register-container">
        <div className="register-box">
          <h2>Join Zot Market</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">UCI Email</label>
              <input type="email" id="email" name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
              />
            </div>

            <button 
              type="submit"
              style={{
                backgroundColor: '#4f46e5',
                color: '#d1d5db',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
                transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
                width: '100%',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
              onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
              onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
            >
              Create Account
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
