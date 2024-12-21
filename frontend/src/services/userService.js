import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post("/api/login", { email, password });
}

const handleGetMovie = () => {
    return axios.get("/movie");
}
export { handleLogin, handleGetMovie }