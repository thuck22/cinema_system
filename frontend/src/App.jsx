import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/Login";
import Home from "./users/Home/Home";
import Booking from "./users/booking/Booking";
import MovieDetail from './users/movieDetail/movieDetail';
import SeatSelection from './users/seat/SeatSelection';
import Navbar from './users/navbar/Navbar'; // Import Navbar component
import Confirmation from "./users/Confirm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      {/* Hiển thị Navbar nếu đã đăng nhập */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Route cho Login */}
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        {/* Các trang khác sẽ yêu cầu người dùng phải đăng nhập */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
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
          path="/confirmation"
          element={isAuthenticated ? <Confirmation /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/seat"
          element={isAuthenticated ? <SeatSelection /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
