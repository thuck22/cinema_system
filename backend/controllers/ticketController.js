const { where } = require('sequelize')
const {Showtime, showtimeSeat, Ticket} = require('../database/models')
const ticket = require('../database/models/ticket')
const {filterNull, checkNull} = require('../util')


//Get tickets by order
const getTickets = async (req, res) => {
   orderId = req.body
   try{
      const tickets = await Ticket.findAll({
         where: { orderId }, 
      })

      if(!tickets.length) return null
      return tickets

   }catch(error){
      return res.status(500).json({ error });
   }
}
//Create multiple tickets
//Seat id is a list
const createTickets = async (req, res) => {
   try {
      const {customerEmail, showtimeId, orderId, seatId } = req.body;
      if(checkNull({showtimeId, orderId, customerEmail })) 
         return res.status(400).json({message:'Tickets creation failed, some fields are missing'})
      
      for(let i = 0; i<seatId.length; i++){
         ticket = await Ticket.create({showtimeId, orderId, seatId, customerEmail: seatId[i]})
         await showtimeSeat.create({showtimeId, ticketId:  ticket.ticketId})
      }
      return true
   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //cancel tickets at leat 1h before start time
 const deleteTicket = async (req, res) => {
   try{
      ticketId = req.body
      ticket = await Ticket.findByPk(ticketId)
      showtime = await Showtime.findByPk(ticket.showtimeId)
      const [hours, minutes, seconds] = showtime.startTime.split(':').map(Number);
      if(hours - now.getHours() < 1) return res.status(400).json({message: "Too late to cancel ticket"})

      await showtimeSeat.destroy({where: {ticketId}})
      await Ticket.destroy({where: {ticketId}})
      return res.status(200).json({message: "Ticket is deleted"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {getTickets, createTickets, deleteTicket}