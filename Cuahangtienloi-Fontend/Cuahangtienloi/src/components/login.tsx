import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      const role = response.data.role;

      switch (role) {
        case "ADMIN":
          navigate("/ADMIN");
          break;
        case "EMPLOYEE":
          navigate("/EMPLOYEE");
          break;
        case "CUSTOMER":
          navigate("/CUSTOMER");
          break;
        default:
          setError("Tài khoản không có vai trò hợp lệ.");
      }
    } catch (err) {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>ĐĂNG NHẬP</h2>


      {error && <div style={styles.error}>{error}</div>}

      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Đăng nhập
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center" as const,
    background: "#f9f9f9",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
