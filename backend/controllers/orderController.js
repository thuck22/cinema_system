const {Order , Showtime, Seat} = require('../database/models')
const {getTickets, createTickets, deleteTicket} = require('./ticketController')
const {getOrderCB_FD, createOrderCB_FD, deleteOrderCB_FD} = require('./orderFDController')
const {filterNull, checkNull} = require('../util')


//Get order infomations (ticket and food, drink) by userEmail
const getOrders = async (req, res) => {
   customerEmail = req.body
   try{
      const orders = await Order.findAll({
         where: { customerEmail }, 
      })
      if(!orders.length) return res.status(404).json({ "message": "No order to be found" })

      for(let i = 0; i<orders.length; i++){
         tickets = getTickets(req, res)
         food_drinks = getOrderCB_FD(req, res)

         orders[i].tickets = tickets
         orders[i].food_drinks = food_drinks
      }

      return res.status(200).json({orders})
   }catch(error){
      return res.status(500).json({ error });
   }
}
//Create with ticket or food or both
const createOrder = async (req, res) => {
   customerEmail = req.body
   try {
      order = await Order.create({customerEmail})
      orderId = order.orderId

      ticketCreated = await createTickets(req, res)

      CB_FDCreated = await createOrderCB_FD(req, res)

      return res.status(201).json({message:'Order creation is successful'});

   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //delete order
 const deleteOrder = async (req, res) => {
   try{
      orderId = req.body
      
      ticketDeleted = await deleteTicket(req, res)

      Cb_FDDeleted = await deleteOrderCB_FD(req, res)

      if(!ticketCreated)
         return res.status(400).json({message: "Cancel order failed, too late to cancel tickets!"})
      
      await Order.destroy({where: orderId})
      return res.status(200).json({message: "Order is successfully canceled"})
   }catch(error){

      return res.status(500).json({ error });
   }
}

module.exports = {createOrder, getOrders, deleteOrder}