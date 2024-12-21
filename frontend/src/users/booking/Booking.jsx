import React, { useEffect, useState } from "react";
import './Booking.css'; // Import file CSS
import './SeatSelection.css';
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

    const [time, setTime] = useState("10:00"); // Thời gian đếm ngược
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seat) => {
        setSelectedSeats((prev) =>
            prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
        );
    };

    // Các hàng ghế (A, B, C, D, E)
    const rows = ['A', 'B', 'C', 'D', 'E'];
    // Mỗi hàng có 10 ghế
    const seatsPerRow = 10;

    // Tạo ra mảng ghế theo cấu trúc hàng
    const seats = rows.map(row => (
        Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
    ));
    console.log(selectedSeats)


    // Đếm ngược thời gian
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

    // Xác nhận đặt vé
    const handleConfirmBooking = () => {
        const ticket = {
            movie: infoBooking.tenPhim,
            seats: selectedSeats,
            time: `${infoBooking.gioChieu} - ${infoBooking.ngayChieu}`,
            cinema: infoBooking.tenCumRap,
            qrCode: 'https://via.placeholder.com/150', // Placeholder cho QR Code
        };

        // Lưu thông tin vé vào localStorage
        localStorage.setItem('ticket', JSON.stringify(ticket));
        navigate('/confirmation'); // Điều hướng sang trang xác nhận
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


            <div className="seat-selection-container">
                <h2>Chọn ghế ngồi</h2>
                <div className="seat-grid">
                    {seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            {row.map((seat) => (
                                <button
                                    key={seat}
                                    className={selectedSeats.includes(seat) ? 'seat selected' : 'seat'}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                <p>Ghế đã chọn: {selectedSeats.join(', ')}</p>
            </div>

            {/* Button để xác nhận booking */}
            <button name="btn1" onClick={handleConfirmBooking}>Xác Nhận Đặt Vé</button>
        </>
    );
}

export default Booking;
