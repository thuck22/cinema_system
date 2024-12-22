import React, { useEffect, useState } from 'react';
import './confirm.css';

function Confirm() {
    const [ticket, setTicket] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Thêm state để kiểm tra trạng thái thanh toán

    useEffect(() => {
        const savedTicket = localStorage.getItem('ticket');
        console.log(savedTicket);
        if (savedTicket) {
            setTicket(JSON.parse(savedTicket));
        }
    }, []);

    // Hàm xử lý thanh toán
    const handlePayment = () => {
        // Cập nhật trạng thái thanh toán thành công
        setPaymentSuccess(true);
        // Có thể thêm logic gửi yêu cầu thanh toán ở đây nếu cần
    };

    return (
        <div className="confirm-container">
            {paymentSuccess ? (
                <div className="payment-success">
                    <h2>Thanh toán thành công!</h2>
                </div>
            ) : (
                <>
                    {ticket ? (
                        <div className="ticket-info">
                            <h1>Thông Tin Vé</h1>
                            <div className="ticket-details">
                                <div className="ticket-item">
                                    <span>Phim:</span>
                                    <span>{ticket.movie}</span>
                                </div>
                                <div className="ticket-item">
                                    <span>Suất chiếu:</span>
                                    <span>{ticket.time}</span>
                                </div>
                                <div className="ticket-item">
                                    <span>Phòng chiếu:</span>
                                    <span>{ticket.cinema}</span>
                                </div>
                                <div className="ticket-item">
                                    <span>Ghế:</span>
                                    <span>{ticket.seats}</span>
                                </div>
                            </div>
                            <button onClick={handlePayment}>Thanh toán</button>
                        </div>
                    ) : (
                        <p>Đang tải thông tin vé...</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Confirm;
