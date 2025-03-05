// const mongoose= require('mongoose');
// const { Schema }=mongoose;

// const UserSchema = new Schema({
//     name:{
//         type: String,
//         required:true
//     },
//     email:{
//         type: String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type: String,
//         required:true
//     },
//     date:{
//         type: Date,
//         default:Date.now
//     },


 
//   });
//   const User =mongoose.model('user',UserSchema)
//   module.exports=User;


const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Ensures the date is set to current time
    }
});

// Creating the User model
const User = mongoose.model('user', UserSchema);
module.exports = User;
