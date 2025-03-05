const express= require('express');
const User=require('../models/User');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: './backend/.env' });
var fetchuser= require('../middleware/fetchuser');


const JWT_SECRET = process.env.JWT_SECRET;

//Create a User using: POST"/api/auth/". Does't require auth
router.post('/createuser',[
    body('password','Must be 5 characters').isLength({min:8}),
    body('name','Enter a Valid Name').isLength({min:5}),
    body('email','Enter a Valid Email').isEmail(),

],

async(req,res)=>{
    let success=false;
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({success,error:error.array()});
    

}
try{
    let user =await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success,error:"Sorry a user withis email already exists"})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt) ;
   user= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass,
});
const data={
    user:{
    id:user.id
}}
const authtoken=jwt.sign(data,JWT_SECRET);
success=true;
res.json({success,authtoken})



// res.json(user)
}catch{
    console.error(error.message);
    res.status(500).send("Some error occured")
}

// .then(user=>res.json(user))
//   .catch(err=>{console.log(err)
//   res.json({error:'Please enter a unique value for email'})})
})
// authnticate a user using post "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try with correct credentials" });
        }

        // Ensure password is not undefined
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Compare passwords (added await)
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({success, error: "Please try with correct credentials" });
        }

        // Generate JWT token
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success= true;

        res.json({ success, authtoken });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).send("Some error occurred");
    }
});





//Get user loggedin detail User Details: POST"/api/auth/getuser".login required


router.post('/getuser',fetchuser, async(req,res)=>{
try{
 
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
}catch (error){
    console.error(error.message);
    res.status(500).send("internal server error")
}
})
module.exports=router;