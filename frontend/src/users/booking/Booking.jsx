import React, { useEffect, useState } from "react";
import './Booking.css'; // Import file CSS
import './SeatSelection.css';
import { useNavigate } from "react-router-dom";
import { handleGetMovie } from "../../services/userService";
import { handleGetShowTime } from "../../services/userService";

function Booking() {
    const navigate = useNavigate();
    const movieId = localStorage.getItem('mvID');
    const [infoBooking, setInfoBooking] = useState({});
    const [showTime, setShowTime] = useState([]);
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

    // Đếm ngược thời gian
    useEffect(() => {
        // Hàm fetch danh sách phim
        const fetchMovies = async () => {
            try {
                const response = await handleGetMovie(movieId); // Gọi API để lấy danh sách phim
                const movieData = response.movie; // Lấy dữ liệu phim từ response (theo cấu trúc bạn cung cấp)

                // Cập nhật state infoBooking với dữ liệu phim
                setInfoBooking({
                    movieId: movieData.movieId,
                    movieName: movieData.movieName,
                    duration: movieData.duration,
                    trailer: movieData.trailer,
                    poster: movieData.poster,
                    // Bạn có thể thêm các trường khác từ response nếu cần
                });

            } catch (e) {
                console.error(`Lỗi load phim: ${e}`);
            }
        };

        const fetchShow = async () => {
            try {
                const response = await handleGetShowTime(movieId); // Gọi API để lấy danh sách phim
                const data = response.showTime; // Lấy dữ liệu phim từ response (theo cấu trúc bạn cung cấp)

                // Cập nhật state infoBooking với dữ liệu phim
                setShowTime({
                    id: data.showtimeId,
                    format: data.format,
                    day: data.showDay,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    movieId: data.movieId,
                    room: data.cinemaRoomId,
                });

            } catch (e) {
                console.error(`Lỗi load suất chiếu: ${e}`);
            }
        };

        fetchMovies();
        fetchShow();

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
    }, [movieId]);


    const handleConfirmBooking = () => {
        const ticket = {
            movie: infoBooking.movieName,
            seats: selectedSeats,
            time: `${formatTime(showTime.startTime)} - ${formatTime(showTime.endTime)}`,
            cinema: 'Cinema_HCMUT_DA', // Giả sử lấy tên rạp này
            qrCode: 'https://via.placeholder.com/150', // Placeholder cho QR Code
        };

        // Lưu thông tin vé vào localStorage
        localStorage.setItem('ticket', JSON.stringify(ticket));

        // Điều hướng sang trang xác nhận
        navigate('/confirm');
    };


    const formatTime = (isoString) => {
        const date = new Date(isoString); // Convert the ISO string to a Date object
        const hours = date.getHours(); // Get the hour part
        const minutes = date.getMinutes(); // Get the minutes part
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`; // Format as HH:MM
    };

    return (
        <>
            <section className="booking-section">
                <div className="booking-container">
                    <div className="movie-details">
                        <div className="movie-banner">
                            <img
                                style={{ width: "10%" }}
                                src={infoBooking.poster}
                                alt="movie-screen"
                            />
                        </div>
                        <div className="movie-description">
                            <h3>{infoBooking.movieName}</h3>
                            <p>Thời lượng: {infoBooking.duration}</p>
                        </div>
                    </div>

                    <div className="booking-info">
                        <div className="booking-item">
                            <span>Tên Rạp:</span>
                            <span>Cinema_HCMUT_DA</span>
                        </div>
                        <div className="booking-item">
                            <span>Suất chiếu:</span>
                            <span>{formatTime(showTime.startTime)} - {formatTime(showTime.endTime)}</span>

                        </div>
                        <div className="booking-item">
                            <span>Phòng chiếu:</span>
                            <span>{showTime.room}</span>

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
