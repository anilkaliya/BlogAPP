const User =require('../models/users');
const express =require('express');
const Router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

Router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then((hash)=>
    {
        const user=new User({
            name:req.body.name,
            password:hash
        });
        user.save().then(data=>{
            console.log("data saved");
            return res.status(201).json({message:"done"})
        }).catch(err=>{
            console.log(err);
           return res.status(201).json({message:err});
        });
    
    });
   
  
});
Router.post("/signin",(req,res,next)=>{
    let fetchedUser
    User.findOne({name:req.body.name}).
    then(user=>{
        if(!user){
            console.log("this fails");
           return res.status(404).json({message:"Authentication failed"});
           
        }
         fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
        if(!result){
            console.log("that fails");
            return res.status(404).json({message:"Auth failed"});
        }
       const token= jwt.sign({name:fetchedUser.name,id:fetchedUser._id},
            "this_is_secret",{expiresIn:"1h"});
            res.status(200).json({
                token: token,
                expiresIn: 3600
              });
    }).catch(err=>{
        console.log("here fails");
        res.status(404).json({message:"auth failed"});
    })
})
module.exports=Router;