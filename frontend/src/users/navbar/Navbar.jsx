import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './navbar.css'; // Để thêm CSS bên ngoài nếu cần
import Booking from '../booking/Booking'
import Showtime from '../movieDetail/movieDetail';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Trang chủ</Link>
            <Link to="/showtime">Lịch chiếu</Link>
            <Link to="/seat">Vé</Link>
            <Link to="/confirmation">Liên hệ</Link>
        </nav>
    );
}

export default Navbar;
