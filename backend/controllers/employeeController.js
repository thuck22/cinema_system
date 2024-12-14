const { where } = require('sequelize')
const {Employee} = require('../database/models')
const {filterNull, checkNull} = require('../util')


//Get all epmloyee by theater
const getEmployees = async (req, res) => {
   const theaterId = req.body

   try{
      const employees = await Employee.findAll({
         where: { theaterId }, 
         order: [['etype', 'ASC']]
      })

      if(!employees.length) return res.status(404).json({ "message": "No employee to be found" })
      
      return res.status(200).json({employees})
   }catch(error){
      return res.status(500).json({ error });
   }
}
//Add new employee
const createEmployee = async (req, res) => {
   try {
      const {fname, lname, phoneNumber, birthday, etype, workType, hourlyWage, monthlySalary, isLeader} = req.body;

      if(checkNull({fname, lname, phoneNumber, birthday, etype, workType})||(!hourlyWage && !monthlySalary)) 
         return res.status(400).json({message:'Employee creation failed, some fields are missing'})
      await Employee.create({fname, lname, phoneNumber, birthday, etype, workType, hourlyWage, monthlySalary, isLeader})

      return res.status(201).json({message:'Employeee creation is successful'});
   } catch (error) {
      return res.status(500).json({ error });
   }
 };

 //cancel tickets at leat 1h before start time
 const updateEmloyee = async (req, res) => {
   try{
      const {employeeId, fname, lname, phoneNumber, birthday, etype, workType, hourlyWage, monthlySalary, isLeader} = req.body;
      const params = filterNull({fname, lname, phoneNumber, birthday, etype, workType, hourlyWage, monthlySalary, isLeader})
      const updated = await Employee.update(params, {where: {employeeId}})
      if(!updated[0]) return res.status(404).json({message: "No employee is found"})

      return res.status(200).json({message: "Update employee successfully"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

//delete employees
const deleteEmployee = async (req, res) => {
   try{
      const {employeeId} = req.body;
      deleted = await Employee.destroy({where: {employeeId}})
      if(!deleted) return res.status(404).json({message: "No employee is found"})

      return res.status(200).json({message: "Delete employee successfully"})
   }catch(error){
      return res.status(500).json({ error });
   }
}

module.exports = {createEmployee, updateEmloyee, getEmployees, deleteEmployee}