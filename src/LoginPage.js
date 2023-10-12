import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css"; // Import your CSS file
import { AuthContext } from "./AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, signIn } = useContext(AuthContext);

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(username, password);
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
