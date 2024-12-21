import React from 'react';
import './Home.css'; // Importing the CSS file for styling
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const movies = [
        {
            id: 1,
            title: "CHỊ DÂU",
            rating: "T16",
            poster: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F12-2024%2Fchi-dau.png&w=1920&q=75",
            releaseDate: "20.12.2024",
            type: "2D LT"
        },
        {
            id: 2,
            title: "MUFASA: VUA SƯ TỬ",
            rating: "P",
            poster: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F12-2024%2Fmufasa-vua-su-tu.png&w=1920&q=75",
            type: "2D LT"
        },
        {
            id: 3,
            title: "NGẢI QUỶ",
            rating: "T16",
            poster: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F12-2024%2Fngai-quy-poster.jpg&w=1920&q=75",
            releaseDate: "15.12.2024",
            type: "2D LT"
        },
        {
            id: 4,
            title: "404 CHẠY NGAY ĐI",
            rating: "T16",
            poster: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F12-2024%2F404-chay-ngay-di.png&w=1920&q=75",
            releaseDate: "27.12.2024",
            type: "2D LT"
        }
    ];

    const handleTrailerClick = (movieId) => {
        console.log(`Opening trailer for movie ${movieId}`);
    };

    const handleBookingClick = (movieId) => {
        // console.log(`Opening booking for movie ${movieId}`);
        navigate(`/booking`);
    };

    return (
        <div className="home">
            <div className="container">
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <div className="poster-wrapper">
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="rating-badge">
                                    <div className="badge-2d">{movie.type}</div>
                                    <div className="badge-rating">{movie.rating}</div>
                                </div>
                            </div>

                            <div className="movie-info">
                                <h3 className="movie-title">{movie.title}</h3>

                                <div className="action-buttons">
                                    <button
                                        onClick={() => handleTrailerClick(movie.id)}
                                        className="btn-trailer"
                                    >
                                        <span>Xem Trailer</span>
                                    </button>
                                    <button
                                        onClick={() => handleBookingClick(movie.id)}
                                        className="btn-booking"
                                    >
                                        ĐẶT VÉ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 
            <div className="nav-arrows">
                <button className="arrow-left">
                    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="arrow-right">
                    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div> */}
            {/* 
            <div className="nav-dots">
                {[...Array(4)].map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === 0 ? 'active' : ''}`}
                    />
                ))}
            </div> */}
        </div>
    );
};

export default Home;
