var express = require('express');
const User = require('../models/user');
const createHttpError = require('http-errors');
var router = express.Router();

/* GET users listing. */
router.get('/:id', async (req, res, next)=> {
  try{
  const {id} = req.params
  const user = await User.findbyId(id)
  res.send(user.toJSON())

  }catch(err){
    console.error(err)
    next(err)

  }
}).put("/:id",async (req,res,next)=>{
  try{
  const {id} = req.params
  const { firstName,lastName,designation,phone} =req.body
  await User.update({firstName,lastName,designation,phone },{where:{id:id}})
  res.status(200).send("Updated successfully")
}catch(e){
  console.log(e)
  next(createHttpError(500))
}
}).delete("/:id",async (req,res,next)=>{
  try{
  const {id} = req.params
  await User.destroy({where:{id:id}})
  res.status(200).send("Delete successfully")
}catch(e){
  console.log(e)
  next(createHttpError(500))
}});

module.exports = router;
