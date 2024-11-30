import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, validateActiveToken } from "../Helpers/userManager";

function LoginPage({setIsLoggedIn, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = await loginUser(username, password);
    if (error) {
      setError(error);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }

    async function checkAuth() {
      const isValid = await validateActiveToken();
      if (isValid) {
        setIsLoggedIn(true);
        navigate("/");
      }
    }
    checkAuth();
  });

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Login to access site</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
