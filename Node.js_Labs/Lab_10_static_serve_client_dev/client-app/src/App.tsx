import { useState } from "react";
import axios from "axios";
import styles from "./index.module.css"; // Import the CSS module
import LoginForm from "./Login";

// The component that will handle both GET and POST requests
const ApiRequestComponent = () => {
  // State to store responses and loading status
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading,   setLoading] = useState(false);

  // GET request handler
  const handleGetRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await axios.get("http://localhost/api/users?key=1");
      setResponse(result.data); // Set response data
      // @ts-ignore
    } catch (err) {
      // @ts-ignore
      setError("Error fetching data"); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // POST request handler
  const handlePostRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await axios.post("http://localhost:4000/api/login", {
        userName: "Esty@gmail.com",
        password: "12345",
      });
      setResponse(result.data); // Set response data
      // @ts-ignore
    } catch (err: any) {
      // @ts-ignore
      setError("Error sending data"); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      {/* <LoginForm /> */}
      <div className={styles.container}>
        <h2>API Request Component</h2>
        <div className={styles.buttonContainer}>
          <button onClick={handleGetRequest} className={styles.button}>
            Get Data (GET)
          </button>
          <button onClick={handlePostRequest} className={styles.button}>
            Send Data (POST)
          </button>
        </div>

        <div className={styles.responseContainer}>
          {loading && <p>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {response && (
            <div className={styles.responseBox}>
              <h3>Response:</h3>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiRequestComponent;
