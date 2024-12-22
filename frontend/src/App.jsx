import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/Login";
import Home from "./users/Home/Home";
import Booking from "./users/booking/Booking";
import MovieDetail from './users/movieDetail/movieDetail';
import Navbar from './users/navbar/Navbar'; // Import Navbar component
import Confirm from "./users/confirm/Confirm";
import CRUD from './admin/CRUD';
import NavbarAdmin from './admin/navbar/Navbar'; // Import NavbarAdmin component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null); // Lưu vai trò của người dùng

  return (
    <Router>
      {/* Hiển thị Navbar phù hợp dựa trên vai trò */}
      {isAuthenticated && (userRole === "admin" ? <NavbarAdmin /> : <Navbar />)}

      <Routes>
        {/* Route cho Login */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={(role) => {
                setIsAuthenticated(true);
                setUserRole(role);
              }}
            />
          }
        />

        {/* Các trang khác sẽ yêu cầu người dùng phải đăng nhập */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/booking"
          element={isAuthenticated ? <Booking /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/showtime"
          element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/confirm"
          element={isAuthenticated ? <Confirm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin/crud"
          element={
            isAuthenticated && userRole === "admin" ? (
              <CRUD />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
