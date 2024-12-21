import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import file CSS

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook để điều hướng

    const handleLogin = () => {
        // Kiểm tra đăng nhập giả lập
        if (username === "admin" && password === "1234") {
            onLogin(); // Gọi hàm props để thay đổi trạng thái đăng nhập
            navigate("/"); // Điều hướng sang trang Home
        } else {
            alert("Sai thông tin đăng nhập!");
        }
    };

    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>
            <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="btn">
                <button onClick={handleLogin}>Đăng nhập</button>
            </div>
        </div>
    );
};

export default Login;
