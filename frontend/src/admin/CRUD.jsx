import React, { useState, useEffect } from "react";
import { handleAddMovie } from "../services/adminService";
import { handleGetAllMovie } from "../services/userService"
import { handleUpdateMovie } from "../services/adminService";
import { handleDeleteMovie } from "../services/adminService";

const CRUD = () => {
    const [movies, setMovies] = useState([]);

    const [editMovie, setEditMovie] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMovie, setNewMovie] = useState({
        movieId: "",
        movieName: "",
        duration: "",
        trailer: "",
        poster: "",
        premiereDay: "",
        movieLabel: "",
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await handleGetAllMovie(); // Gọi API để lấy danh sách phim
                const data = response.movies;

                // Định dạng dữ liệu
                const formattedData = data.map((item) => ({
                    movieId: item.movieId,
                    movieName: item.movieName,
                    duration: item.duration,
                    trailer: item.trailer,
                    poster: item.poster,
                    premiereDay: item.premiereDay,
                    movieLabel: item.movieLabel,
                }));

                setMovies(formattedData); // Lưu dữ liệu định dạng vào state
            } catch (e) {
                console.error(`Lỗi load danh sách phim: ${e}`);
            }
        };

        fetchMovies();
    }, []);

    const handleSaveMovie = async () => {
        if (editMovie) {
            // Nếu đang sửa phim, cập nhật lại danh sách phim và gửi API update
            await handleUpdateMovie(newMovie); // Gọi API cập nhật phim

            // Cập nhật lại bộ phim trong danh sách
            setMovies(
                movies.map((movie) =>
                    movie.movieId === newMovie.movieId ? newMovie : movie
                )
            );
            setEditMovie(null);
        } else {
            // Nếu thêm mới phim, tạo một movieId mới và gọi API thêm phim
            const movieWithId = { ...newMovie, movieId: `MV${movies.length + 1}` };
            setMovies([...movies, movieWithId]);
            await handleAddMovie(movieWithId); // Gọi API thêm phim
        }

        // Đóng modal và reset form
        setShowAddModal(false);
        setNewMovie({
            movieId: "",
            movieName: "",
            duration: "",
            trailer: "",
            poster: "",
            premiereDay: "",
            movieLabel: "",
        });
    };

    const deleteMovie = async (movieId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
            setMovies(movies.filter((movie) => movie.movieId !== movieId));
            await handleDeleteMovie(movieId); // Gọi API xóa phim
        }
    };

    return (
        <div style={{ padding: "20px", position: "relative" }}>
            <h1
                style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                Quản Lý Phim
            </h1>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "30%",
                    }}
                    onClick={() => setShowAddModal(true)}
                >
                    + Thêm phim
                </button>
            </div>

            <div>
                {movies.map((movie) => (
                    <div
                        key={movie.movieId}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={movie.poster}
                            alt={movie.movieName}
                            style={{ width: "100px", height: "150px", marginRight: "10px" }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: "0", fontWeight: "bold" }}>
                                {movie.movieName}
                            </h3>
                            <p style={{ margin: "5px 0" }}>Mã phim: {movie.movieId}</p>
                            <p style={{ margin: "5px 0" }}>Thời lượng: {movie.duration} phút</p>
                            <p style={{ margin: "5px 0" }}>Ngày công chiếu: {movie.premiereDay}</p>
                            <p style={{ margin: "5px 0" }}>Nhãn phim: {movie.movieLabel}</p>
                        </div>
                        <div>
                            <button
                                style={{
                                    marginRight: "10px",
                                    padding: "5px 10px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    // Set dữ liệu của bộ phim vào form để sửa
                                    setEditMovie(movie);
                                    setNewMovie({ ...movie });
                                    setShowAddModal(true);
                                }}
                            >
                                Cập nhật
                            </button>
                            <button
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => deleteMovie(movie.movieId)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {(editMovie || showAddModal) && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "400px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            {editMovie ? "Cập nhật phim" : "Thêm phim"}
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveMovie(); // Chỉ cần gọi handleSaveMovie()
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Tên phim"
                                value={newMovie.movieName}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, movieName: e.target.value })
                                }
                                required
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Thời lượng (phút)"
                                value={newMovie.duration}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, duration: e.target.value })
                                }
                                required
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Trailer"
                                value={newMovie.trailer}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, trailer: e.target.value })
                                }
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Poster URL"
                                value={newMovie.poster}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, poster: e.target.value })
                                }
                                required
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                }}
                            />
                            <input
                                type="date"
                                value={newMovie.premiereDay}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, premiereDay: e.target.value })
                                }
                                required
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Nhãn phim"
                                value={newMovie.movieLabel}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, movieLabel: e.target.value })
                                }
                                required
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    margin: "0",
                                    margin: "0",
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    margin: "0",
                                }}
                            >
                                Lưu
                            </button>
                            <button
                                onClick={() => {
                                    setEditMovie(null);
                                    setShowAddModal(false);
                                }}
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#6c757d",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    margin: "0",
                                }}
                            >
                                Hủy
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


export default CRUD;
