const express = require('express');
const router = express.Router();
const {getShowtimes, createShowtime, updateShowtime, deleteShowtime} = require('../controllers/showtimeController')

router.post('/', async (req, res) => {
  try {
   await createShowtime(req, res);

  }catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
   await getShowtimes(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/', async (req, res) => {
  try {
    await updateShowtime(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await deleteShowtime(req, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
