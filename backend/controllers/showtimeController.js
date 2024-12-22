const {Showtime} = require('../database/models')
const {filterNull, checkNull} = require('../util')


//Get all
//Grouping by movies
const getShowtimes = async (req, res) => {
   theaterId = req.body
   try{
      const showtimes = await Showtime.findAll({
         where: { theaterId }, 
         attributes: [
            'movieId',
            [sequelize.fn('STRING_AGG', sequelize.col('startTime'), ','), 'showtimes'], 
         ],
         group: ['movieId'], 
      })

      if(!showtimes.length) return res.status(404).json({ "message": "No showtimes to be found" })

   }catch(error){
      return res.status(500).json({ error });
   }
}
//Create showtime
const createShowtime = async (req, res) => {
   try {
      const { theaterId, movieId, cinemaRoomId, showDay, format, startTime, endTime } = req.body;
      if(checkNull({ moviename, movieLabel, premireDay, trailer, duration })) 
         return res.status(400).json({message:'Course creation failed, some fields are missing'})
     
      await Showtime.create({  theaterId, movieId, cinemaRoomId, showDay, format, startTime, endTime });

      return res.status(201).json({message:'Movie creation is successful'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };
//Update showtime
const updateShowtime = async (req, res) => {
   try {
      const { showtimeId ,theaterId, movieId, cinemaRoomId, showDay, format, startTime, endTime } = req.body;
      params = filterNull({  theaterId, movieId, cinemaRoomId, showDay, format, startTime, endTime })
     
      update = await Movie.update(params, {where: {showtimeId}});

      if(!update[0]) return res.status(404).json({message:'No showtime to be found'});

   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //delete showtime
 const deleteShowtime = async (req, res) => {
   try{
      showtimeId = req.body
      showtime = Showtime.findByPk(showtimeId)
      if(!showtime) return res.status(404).json({message: "No showtime is found"})

      await Showtime.destroy({where: showtimeId})
      return res.status(200).json({message: "Showtime is delete"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {getShowtimes, createShowtime, updateShowtime, deleteShowtime}