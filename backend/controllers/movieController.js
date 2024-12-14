const { where } = require('sequelize')
const {Movie, movieGenre, Country} = require('../database/models')
const {filterNull, checkNull} = require('../util')


//Get all movies
const getMovies = async (req, res) => {
   try{
      //findall() return an array
      movies = await Movie.findAll()
      if(!movies.length) return res.status(404).json({ "message": "No movies to be found" })

      for(let i = 0; i<movies.length; i++){
         countries = Country.findAll({
            where:{
               movieId: movies[i].movieId,
            },
         })
         movies[i].countries = countries

         genres = movieGenre.findAll({
            where:{
               movieId: movies[i].movieId,
            },
         })
         movies[i].genres = genres
      }
   }catch(error){
      return res.status(500).json({ error });
   }
}
//Create movie 
const createMovie = async (req, res) => {
   try {
      const { movieName, movieLabel, premiereDay, trailer, duration, country, genre } = req.body;
      if(checkNull({ movieName, movieLabel, premiereDay, trailer, duration })) 
         return res.status(400).json({message:'Course creation failed, some fields are missing'})
     
      newMovie = await Movie.create({  movieName, movieLabel, premiereDay, trailer, duration });

      //add country and genre
      if(country.length){
         for (let i = 0; i<country.length; i++){
            await Country.create({movieId: newMovie.movieId, countryName: country[i]})
         }
      }

      if(genre.length){
         for (let i = 0; i<country.length; i++){
            await movieGenre.create({movieId: newMovie.movieId, movieGenreName: country[i]})
         }
      }

      return res.status(201).json({message:'Movie creation is successful'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };
//Update movies
const updateMovie = async (req, res) => {
   try {
      const { movieId, movieName, movieLabel, premiereDay, trailer, duration, country, genre } = req.body;
      params = filterNull({ movieName, movieLabel, premiereDay, trailer, duration })
     
      update = await Movie.update(params, {where: {movieId}});

      if(!update[0]) return res.status(404).json({message:'No movie to be found'});

      //update country and genre
      if(country.length){
         await Country.destroy({where:{movieId}})
         for (let i = 0; i<country.length; i++){
            await Country.create({movieId: newMovie.movieId, countryName: country[i]})
         }
      }

      if(genre.length){
         await movieGenre.destroy({where:{movieId}})
         for (let i = 0; i<country.length; i++){
            await movieGenre.create({movieId: newMovie.movieId, movieGenreName: country[i]})
         }
      }

      return res.status(201).json({message:'Movie update is successful'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //delete movie
 const deleteMovie = async (req, res) => {
   try{
      movieId = req.body
      movie = await Movie.findByPk(movieId)
      if(!movie) return res.status(404).json({message: "No movie is found"})
      //delet Genres and countries first
      await Country.destroy({where: {movieId}})

      await Genre.destroy({where: {movieId}})

      await Movie.destroy({where: {movieId}})

      return res.status(200).json({message: "Movie is deleted"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {getMovies, createMovie, updateMovie, deleteMovie}