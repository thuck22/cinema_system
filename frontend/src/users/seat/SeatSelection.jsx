import React, { useState } from 'react';
import './SeatSelection.css'; // Nhập file CSS

const SeatSelection = () => {
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

    return (
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
    );
};

export default SeatSelection;
