const express = require('express')
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');


router.post('/add', async(req, res) => {

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(7).email().required(),
      password: Joi.string().min(5).required()
    });
    
    const {error} = schema.validate(req.body);
    if(error) return res.send(error.details[0].message)

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

     const user =   new UserModel({
       name: req.body.name,
       email: req.body.email,
       password: hashPassword
     });
     const save = await user.save();
     try{
       res.send(save)
     }catch(err){
        res.send(err);
     };
    
});

router.get('/all', async (req, res) => {
    const users = await UserModel.find({})
   try{
       res.send(users)
     }catch(err){
        res.send(err);
     };    
});

router.get('/user/:id', async (req, res) => {
     const id = req.params.id;
     const userid = await UserModel.findById(id);

    try{
       res.send(userid)
     }catch(err){
        res.send(err);
     };
});


router.delete('/user/:id', (req, res)=>{
    const id = req.params.id;
    const deleteuser = UserModel.remove({
      _id: id 
    })
    try{
      res.send(deleteuser);
    }catch(err){
      res.send(err);
    }     
});

router.patch('/user/:id', async (req, res)=>{
    const id = req.params.id;
    const updateuser = await UserModel.updateOne(
      {
        _id: id
      },
      {
         $set: req.body 
       }
       )
      
       try{
         res.send(updateuser);
       }catch(err){
         res.send(err);
       }
  }); 

module.exports = router ;