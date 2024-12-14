const {Combo, FD} = require('../database/models')
const hasCB_FD = require('../database/models/ticket')
const {filterNull, checkNull} = require('../util')


//
const getOrderCB_FD = async (req, res) => {
   orderId = req.body
   try{
      const CB_FDs = await hasCB_FD.findAll({
         where: { orderId }, 
      })

      return CB_FDs
   }catch(error){
      return res.status(500).json({ error });
   }
}
//
const createOrderCB_FD = async (req, res) => {
   try {
      const {orderId, comboId, FDId, comboQuantity, FDQuantity } = req.body;
      if(!comboId && !FDId) return null

      if(comboId.length){
         for(let i = 0; i< comboId.length; i++){
            await hasCB_FD.create({orderId, comboId: comboId[i], quantity: comboQuantity[i]})
         }
      }
      if(FDId.length){
         for(let i = 0; i< FDId.length; i++){
            await hasCB_FD.create({orderId, FDId: FDId[i], quantity: FDQuantity[i]})
         }
      }
      return true
   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //
 const deleteOrderCB_FD = async (req, res) => {
   try{
      orderId = req.body
      deleted = await hasCB_FD.destroy({where: {orderId}})
      if(!deleted) return null
      return true
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {getOrderCB_FD, createOrderCB_FD, deleteOrderCB_FD}