import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      setToken(response.data.token);
      setError("");
      alert("Login successful. Token stored.");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data || "Failed to fetch profile");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1em" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "1em", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1em", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ marginBottom: "1em" }}>
        Login
      </button>
      {token && (
        <div>
          <button onClick={fetchProfile}>Fetch Profile</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profileData && (
        <pre style={{ backgroundColor: "#f4f4f4", padding: "1em" }}>
          {JSON.stringify(profileData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default LoginForm;
