import React, { useEffect, useState } from 'react';
import './confirm.css'

const Confirmation = () => {
    const [ticket, setTicket] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false); // Trạng thái xác nhận

    useEffect(() => {
        const storedTicket = JSON.parse(localStorage.getItem('ticket'));
        console.log(storedTicket);
        setTicket(storedTicket);
    }, []);

    if (!ticket) {
        return <p>Loading...</p>;
    }

    // Xử lý khi nhấn nút xác nhận
    const handleConfirm = () => {
        setIsConfirmed(true); // Đặt trạng thái xác nhận thành true
    };

    return (
        <div className="confirmation-container">
            <h2>Vé của bạn</h2>
            <p><strong>Phim:</strong> {ticket.movie}</p>
            <p><strong>Ghế:</strong> {ticket.seats}</p>
            <p><strong>Thời gian:</strong> {ticket.time}</p>
            <p><strong>Rạp:</strong> {ticket.cinema}</p>
            <img src={ticket.qrCode} alt="QR Code" />

            {/* Nút xác nhận */}
            {!isConfirmed && (
                <button
                    onClick={handleConfirm}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Xác nhận
                </button>
            )}

            {/* Hiển thị thông báo sau khi xác nhận */}
            {isConfirmed && (
                <p style={{
                    marginTop: '20px',
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>
                    Vé của bạn đã được đặt thành công! 🎉
                </p>
            )}
        </div>
    );
};

export default Confirmation;
