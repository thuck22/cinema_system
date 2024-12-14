const { where } = require('sequelize')
const {FD, Combo, comboHas} = require('../database/models')
const {filterNull, checkNull} = require('../util')


//Get all food drinks and combo
const getFoodDrink = async (req, res) => {

   try{
      const food_drinks = await Showtime.findAll()

      if(!food_drinks.length) return res.status(404).json({ "message": "No food or drinks to be found" })
      return res.status(200).json(food_drinks)
   }catch(error){

      return res.status(500).json({ error });
   }
}

const getCombos = async (req, res) => {

   try{
      const combos = await Combo.findAll()

      if(!combos.length) return res.status(404).json({ "message": "No combo to be found" })
      return res.status(200).json(combos)
   }catch(error){
      
      return res.status(500).json({ error });
   }
}
//Create food, drink / combo
const createFoodDrink = async (req, res) => {
   try {
      const { FDname, cost, price, quantity } = req.body;
      if(checkNull({ FDname, cost, price })) 
         return res.status(400).json({message:'Food or drink creation failed, some fields are missing'})
     
      await Showtime.create({ FDname, cost, price, quantity});

      return res.status(201).json({message:'Adding food, drink successfully'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };
//Create combo with multiple food, drinks
 const createCombo = async (req, res) => {
   try {
      const { comboName, comboPrice, FD_list, quantity_list } = req.body;
      if(!comboName||!FD_list.length||!quantity_list.length) 
         return res.status(400).json({message:'Combo creation failed, some fields are missing'})
      
      await Combo.create({comboName, comboPrice})

      for(let i = 0; i > FD_list.length; i++){
         await comboHas.create({comboId, FDId: FD_list[i], FDquantity: quantity_list[i]})
      }
      return res.status(201).json({message:'Adding combo successfully'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };
//Update food,drink /combo
const updateFoodDrink = async (req, res) => {
   try {
      const { FDId, cost, price, quantity } = req.body;
      params = filterNull({ cost, price, quantity})
     
      update = await FD.update(params, {where: {FDId}});

      if(!update[0]) return res.status(404).json({message:'No food or drink to be found'});

   } catch (error) {
      return res.status(500).json({ error });
   }
 };
 //add or remove food, drink from combo
const updateCombo = async (req, res) => {
   try {
      const { ComboId, comboPrice, comboName ,FDId, operation , quantity  } = req.body;
      
      if(operation === "ADD"){
         await comboHas.create({ComboId, FDId, quantity})
      }
      if(operation === "DELETE"){
         await comboHas.destroy({where:{ComboId, FDId}})
      }
      if(operation === "CHANGE QUANTITY"){
         await comboHas.update(quantity ,{where:{ComboId, FDId}})
      }
      params = filterNull({comboPrice, comboName})
      if(params)
         update = await Combo.update(params, {where:{comboId}})

      return res.status(200).json({message:'Update combo successfully'});

   } catch (error) {
      return res.status(500).json({ error });
   }
 };
 //delete food, drinks / combo
const deleteFoodDrink = async (req, res) => {
   try{
      FDId = req.body
      food_drinks = FD.findByPk(FDId)
      if(!showtime) return res.status(404).json({message: "No food or drink is found"})
      await FD.destroy({where: FDId})
      return res.status(200).json({message: "Food or drink is delete"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

const deleteCombo = async (req, res) => {
   try{
      comboId = req.body
      combo = Combo.findByPk(comboId)
      if(!combo) return res.status(404).json({message: "No combo is found"})
      
      await comboHas.destroy({where: comboId})
      await Combo.destroy({where:{comboId}})

      return res.status(200).json({message: "Combo is delete"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {getFoodDrink, createFoodDrink, updateFoodDrink, deleteFoodDrink, getCombos, createCombo, updateCombo, deleteCombo}