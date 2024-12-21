import React, { useEffect, useState } from 'react';

const Confirmation = () => {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const storedTicket = JSON.parse(localStorage.getItem('ticket'));
        console.log(storedTicket);
        setTicket(storedTicket);
    }, [localStorage.getItem('ticket')]); // Buộc re-render khi ticket thay đổi


    // if (!ticket) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="confirmation-container">
            <h2>Vé của bạn</h2>
            <p><strong>Phim:</strong> {ticket.movie}</p>
            <p><strong>Ghế:</strong> {ticket.seats.join(', ')}</p>
            <p><strong>Thời gian:</strong> {ticket.time}</p>
            <p><strong>Rạp:</strong> {ticket.cinema}</p>
            <img src={ticket.qrCode} alt="QR Code" />
        </div>
    );
};

export default Confirmation;
