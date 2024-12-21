// MovieDetail.js
import React from 'react';
import './MovieDetail.css'; // Đảm bảo bạn đã nhập đúng file CSS

const MovieDetail = () => {
    const movie = {
        title: 'Avengers',
        description: 'Bộ phim siêu anh hùng nổi tiếng.',
        genre: 'Action',
        duration: 120,
        director: 'Joss Whedon',
    };

    const schedules = [
        { time: '10:00 AM', date: '21/12/2024', cinema: 'Rạp 1' },
        { time: '2:00 PM', date: '21/12/2024', cinema: 'Rạp 2' },
    ];

    return (
        <div className="movie-detail">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Thể loại: {movie.genre}</p>
            <p>Thời lượng: {movie.duration} phút</p>
            <p>Đạo diễn: {movie.director}</p>
            <h3>Lịch chiếu</h3>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>
                        <span>{schedule.date}</span> - {schedule.time} - {schedule.cinema}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieDetail;
