import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'; // Import file CSS
import hcmutLogo from './hcmut.png'; // Import logo
import backgroundImage from './background.jpeg'; // Import background image

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Kiểm tra đăng nhập giả lập
        if (username === "admin" && password === "1234") {
            onLogin("admin"); // Xác định vai trò là admin
            navigate("/admin/crud"); // Điều hướng đến trang CRUD
        } else if (username === "user" && password === "1234") {
            onLogin("user"); // Xác định vai trò là user
            navigate("/"); // Điều hướng đến trang Home
        } else {
            alert("Sai thông tin đăng nhập!");
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="login-card">
                <div className="login-header">
                    <img
                        src={hcmutLogo}
                        alt="HCMUT Logo"
                        className="logo"
                    />
                    <h2>Rạp chiếu phim HCMUT</h2>
                </div>
                <div className="login-body">
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button onClick={handleLogin} className="login-button">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;