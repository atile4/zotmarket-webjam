import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBVEm25iPBkBoq1JxkkPfzWmYLfhe3K0s0",
  authDomain: "zotmarket-3e777.firebaseapp.com",
  projectId: "zotmarket-3e777",
  storageBucket: "zotmarket-3e777.firebasestorage.app",
  messagingSenderId: "445300335827",
  appId: "1:445300335827:web:780cfc83959955c7622026",
  measurementId: "G-6H0NRZD95K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
						<button onClick={handleSignOut} className="auth-link">
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
								/>
								<input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{error && <p className="error">{error}</p>}
								<button type="submit">Sign In</button>
								<button
									type="button"
									onClick={() => setShowLogin(false)}
								>
									Cancel
								</button>
							</form>
						) : (
							<>
								<button
									onClick={() => setShowLogin(true)}
									className="auth-link"
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
