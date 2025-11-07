import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig, auth, app } from "./firebase";

function Header() {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showLogin, setShowLogin] = useState(false);
	const [error, setError] = useState("");

	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setShowLogin(false);
			setEmail("");
			setPassword("");
			setError("");
		} catch (err) {
			setError("Invalid email or password");
		}
	};

	const handleSignOut = () => {
		signOut(auth);
	};

	return (
		<header className="header">
			<Link to="/" className="logo-link">
				<h1 className="logo">Zot Market</h1>
			</Link>

			<div className="auth-links">
				{user ? (
					<>
						<span className="welcome-text">What's up! {user.email}</span>
						<button onClick={handleSignOut} className="auth-link"
            style={{
    backgroundColor: '#4f46e5',
    color: '#d1d5db',  // Tailwind’s gray-300
    border: 'none',
    padding: '10px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
    transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
  onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
  onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
            >
							Sign Out
						</button>
					</>
				) : (
					<>
						{showLogin ? (
							<form onSubmit={handleSignIn} className="login-form">
								<input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
                  style={{
        width: '100%',
        padding: '10px 12px',
        marginBottom: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1.5px solid #ccc',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = '#4f46e5')}  // Indigo focus
      onBlur={e => (e.currentTarget.style.borderColor = '#ccc')}
								/>
								<input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}

                  style={{
        width: '100%',
        padding: '10px 12px',
        marginBottom: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1.5px solid #ccc',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = '#4f46e5')}  // Indigo focus
      onBlur={e => (e.currentTarget.style.borderColor = '#ccc')}
								/>
								{error && <p className="error">{error}</p>}
								<button type="submit"
                
                style={{
    backgroundColor: '#4f46e5',
    color: '#d1d5db',  // Tailwind’s gray-300
    border: 'none',
    padding: '10px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
    transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
    marginRight: '10px', 
    marginLeft: '10px',
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
  onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
  onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                >Sign In</button>
								<button
									type="button"
									onClick={() => setShowLogin(false)}

                  style={{
    backgroundColor: '#4f46e5',
    color: '#d1d5db',  // Tailwind’s gray-300
    border: 'none',
    padding: '10px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
    transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
  onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
  onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
								>
									Cancel
								</button>
							</form>
						) : (
							<>
								<button
									onClick={() => setShowLogin(true)}
									className="auth-link"


                  style={{
    backgroundColor: '#4f46e5',
    color: '#d1d5db',  // Tailwind’s gray-300
    border: 'none',
    padding: '10px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
    transition: 'background-color 0.3s ease, boxShadow 0.2s ease',
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
  onMouseDown={e => (e.currentTarget.style.backgroundColor = '#3730a3')}
  onMouseUp={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
								>
									Sign In
								</button>
								
							</>
						)}
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
