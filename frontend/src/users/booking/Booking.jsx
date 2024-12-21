import React, { useEffect, useState } from "react";
import './Booking.css'; // Import file CSS
import SeatSelection from '../seat/SeatSelection'; // Giả sử đây là component chọn ghế
import { useNavigate } from "react-router-dom";

function Booking() {
    const navigate = useNavigate();
    const [infoBooking, setInfoBooking] = useState({
        tenPhim: "Avengers: Endgame",
        moTa: "Phim siêu anh hùng hấp dẫn, kết thúc cuộc chiến với Thanos.",
        tenCumRap: "CGV Cinemas",
        gioChieu: "20:00",
        ngayChieu: "24/12/2024",
        tenRap: "Rạp 1",
    });

    // Lưu thời gian đếm ngược (hard code luôn 10 phút)
    const [time, setTime] = useState("10:00");

    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const [minutes, seconds] = prevTime.split(":").map(Number);
                let newMinutes = minutes;
                let newSeconds = seconds - 1;

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }

                if (newMinutes < 0) {
                    clearInterval(interval);
                    alert("Time out for booking");
                }

                return `${newMinutes < 10 ? "0" + newMinutes : newMinutes}:${newSeconds < 10 ? "0" + newSeconds : newSeconds}`;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleConfirmBooking = () => {
        const ticket = {
            movie: infoBooking.tenPhim,
            seats: selectedSeats,
            time: `${infoBooking.gioChieu} - ${infoBooking.ngayChieu}`,
            cinema: infoBooking.tenCumRap,
            qrCode: 'https://via.placeholder.com/150',
        };

        // Lưu thông tin vé vào localStorage
        localStorage.setItem('ticket', JSON.stringify(ticket));
        navigate('/confirmation');; // Hoặc dùng React Router để điều hướng
    };

    return (
        <>
            <section className="booking-section">
                <div className="booking-container">
                    <div className="movie-details">
                        <div className="movie-banner">
                            <img
                                style={{ width: "100%" }}
                                src="/img/bg-screen.png"
                                alt="movie-screen"
                            />
                        </div>
                        <div className="movie-description">
                            <h3>{infoBooking.tenPhim}</h3>
                            <p>{infoBooking.moTa}</p>
                        </div>
                    </div>

                    <div className="booking-info">
                        <div className="booking-item">
                            <span>Tên Rạp:</span>
                            <span>{infoBooking.tenCumRap}</span>
                        </div>
                        <div className="booking-item">
                            <span>Xuất chiếu:</span>
                            <span>{infoBooking.gioChieu} - {infoBooking.ngayChieu}</span>
                        </div>
                        <div className="booking-item">
                            <span>Phòng chiếu:</span>
                            <span>{infoBooking.tenRap}</span>
                        </div>
                        <div className="booking-item">
                            <span>Time hold the chair:</span>
                            <span>{time}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Component SeatSelection cho phép chọn ghế */}
            <SeatSelection setSelectedSeats={setSelectedSeats} />

            {/* Button để xác nhận booking */}
            <button name="btn1" onClick={handleConfirmBooking}>Xác Nhận Đặt Vé</button>
        </>
    );
}

export default Booking;
