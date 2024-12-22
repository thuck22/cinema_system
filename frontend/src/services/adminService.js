import axios from "../axios";

const handleAddMovie = (movie) => {
    return axios.post('/create-movie', movie);
}

const handleUpdateMovie = (movie) => {
    console.log(movie)
    return axios.put('/update-movie', movie);
}

const handleDeleteMovie = (id) => {
    return axios.delete(`/delete-movie/${id}`);
}

export { handleAddMovie, handleUpdateMovie, handleDeleteMovie };