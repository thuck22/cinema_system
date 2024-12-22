import React, { useEffect, useState } from 'react';
import './Home.css'; // Importing the CSS file for styling
import { handleGetAllMovie } from '../../services/userService'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await handleGetAllMovie(); // Gọi API để lấy danh sách phim
                const data = response.movies;

                // Định dạng dữ liệu
                const formattedData = data.map((item) => ({
                    id: item.movieId,
                    name: item.movieName,
                    duration: item.duration,
                    trailer: item.trailer,
                    poster: item.poster,
                    premiereDay: item.premiereDay,
                    label: item.movieLabel,
                }));

                setMovies(formattedData); // Lưu dữ liệu định dạng vào state
            } catch (e) {
                console.error(`Lỗi load danh sách phim: ${e}`);
            }
        };

        fetchMovies();
    }, []);
    const handleTrailerClick = (movieId) => {
        console.log(`Opening trailer for movie ${movieId}`);
    };

    const handleBookingClick = (movieId) => {
        // console.log(`Opening booking for movie ${movieId}`)
        localStorage.setItem('mvID', movieId);

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
                                    alt={movie.name}
                                    className="movie-poster"
                                />
                                <div className="rating-badge">
                                    <div className="badge-2d">2D</div>
                                    <div className="badge-rating">{movie.label}</div>
                                </div>
                            </div>

                            <div className="movie-info">
                                <h3 className="movie-title">{movie.name}</h3>

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
