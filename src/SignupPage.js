import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SignupPage.css"; // Import your CSS file
import { AuthContext } from "./AuthContext";
import { signUp } from './Authentication';

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(username, email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };


  if (user) {
    navigate("/home");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default SignupPage;
