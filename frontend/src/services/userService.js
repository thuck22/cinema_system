import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post("/api/login", { email, password });
}

const handleGetAllMovie = () => {
    return axios.get("/movie");
}

const handleGetMovie = (movieId) => {
    return axios.get(`/movie/${movieId}`);
}

const handleGetShowTime = (movieId) => {
    return axios.get(`/showTime/${movieId}`);
}

const handleCreateTicket = (ticket) => {
    return axios.post("/ticket", ticket);
}

export { handleLogin, handleGetMovie, handleGetAllMovie, handleGetShowTime, handleCreateTicket };