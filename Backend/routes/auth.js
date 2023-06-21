const express = require('express')
const router= express.Router()
const User = require( '../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET="YoMan";

router.post('/createUser', [
    body('email','Enter a valid Email').isEmail(),
    body('name','Enter minimum 4 characters').isLength({min:4}),
    body('password','Enter minimum 6 characters').isLength({min:6})

], async (req,res)=>{
let success= false;
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({success, errors: errors.array() });
}
try {
    
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"User with this email already exists"})
    }
    
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);

       user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })

      const data={
        user:{
            id:user.id
        }
      }

      const authToken=jwt.sign(data,JWT_SECRET);
    //   console.log(authToken);
    //   console.log(user.id);
    success=true;
      res.json({success,authToken});
} catch (error) {
    console.log({error:error.message})
    res.status(500).send("Internal server error")
}

});


router.post('/login', [
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').notEmpty()
], async (req,res)=>{
let success= false;
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const{email,password}= req.body;
try {
    
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({success,error:"Try to login with correct credentials"})
    }
    
    const passwordCompare=await bcrypt.compare(password,user.password)

    if(!passwordCompare){
        return res.status(400).json({success,error:"Try to login with correct credentials"}); 
    }
      const data={
        user:{
            id:user.id
        }
      }

      const authToken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authToken});
} catch (error) {
    console.log({error:error.message})
    res.status(500).send("Internal server error")
}

});



router.post('/getUser',fetchUser, async (req,res)=>{

 let   userId=req.user.id;
let user= await User.findById(userId).select("-password");
try {
    res.send(user);
} catch (error) {
    console.log({error:error.message})
    res.status(500).send("Internal server error")
}

});



module.exports = router;


