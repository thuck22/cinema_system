const express = require('express');
const router = express.Router();
const {getMovies, createMovie, updateMovie, deleteMovie} = require('../controllers/movieController')

router.post('/', async (req, res) => {
  try {
   await createMovie(req, res);

  }catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
   await getMovies(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/', async (req, res) => {
  try {
    await updateMovie(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await deleteMovie(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
