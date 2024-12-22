import React, { useEffect, useState } from 'react';
import './confirm.css';
import { handleCreateTicket } from '../../services/userService';

const generateOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    return `OR${randomNumber.toString().padStart(4, '0')}`; // Prefix "OR" and pad number to ensure it's always 4 digits
};

function Confirm() {
    const [ticket, setTicket] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [paymentError, setPaymentError] = useState(null); // Error handling

    useEffect(() => {
        const savedTicket = localStorage.getItem('ticket');
        if (savedTicket) {
            setTicket(JSON.parse(savedTicket));
        }
        setLoading(false); // Once loading is done, set loading to false
    }, []);
    console.log(ticket)

    const handlePayment = async () => {
        if (!ticket) {
            return; // If ticket is not available, do nothing
        }

        // Prepare the payment data
        const paymentData = {
            showtimeId: ticket.showTimeId,
            seatId: ticket.seatId.join(','),
            roomId: ticket.roomId,
            ticketPrice: 50000 * ticket.seatId.length,  // Assuming ticketPrice is available in ticket data
            boughtTime: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            orderId: generateOrderId(),
        };
        console.log(paymentData);

        try {
            console.log('Payment data:', paymentData);
            await handleCreateTicket(paymentData);
            setPaymentSuccess(true);
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentError('There was an error processing your payment. Please try again later.');
        }
    };

    // Display ticket details if available
    const renderTicketDetails = () => {
        if (loading) {
            return <p>Đang tải thông tin vé...</p>;
        }

        if (!ticket) {
            return <p>Không tìm thấy thông tin vé!</p>;
        }

        return (
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
                        <span>{ticket.roomId}</span>
                    </div>
                    <div className="ticket-item">
                        <span>Ghế:</span>
                        <span>{ticket.seatId}</span>
                    </div>
                    <div className="ticket-item">
                        <span>Giá vé:</span>
                        <span>{ticket.seatId.length ? `${50000 * ticket.seatId.length} VND` : 'N/A'}</span>
                    </div>
                </div>
                <button onClick={handlePayment}>Thanh toán</button>
            </div>
        );
    };

    return (
        <div className="confirm-container">
            {paymentSuccess ? (
                <div className="payment-success">
                    <h2>Thanh toán thành công!</h2>
                </div>
            ) : (
                <>
                    {renderTicketDetails()}
                    {paymentError && <div className="payment-error">{paymentError}</div>}
                </>
            )}
        </div>
    );
}

export default Confirm;
