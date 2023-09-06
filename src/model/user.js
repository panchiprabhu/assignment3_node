const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    email: {
        type: String,
        required : true,
        unique: [true,'Email ID already present!'],
        validate(value){
            if(!validator.isEmail(value)){
                logger.error("User with the provided email already exists")
                throw new Error("Invalid email")
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
    }
})

//new collection
const User = new mongoose.model('User',userSchema);
module.exports = User;