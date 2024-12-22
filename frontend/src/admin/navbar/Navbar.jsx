import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { useNavigate } from 'react-router-dom';
import './navbar.css'; // Để thêm CSS bên ngoài nếu cần

const NavbarAdmin = () => { // Nhận hàm onLogout qua props
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <Link to="/">Trang chủ</Link>
            <Link to="/showtime">Lịch chiếu</Link>
            <Link to="/confirmation">Liên hệ</Link>
            <Link to="/admin/crud">CRUD Phim</Link>
            <button onClick={() => { navigate("/login") }} name="logout">Đăng xuất</button>
        </nav>
    );
}

export default NavbarAdmin;