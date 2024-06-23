const mongoose = require('mongoose');
const { Schema } = mongoose;


//schema ho kyare yo

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    profession:{
        type: String,
        // default: Date.now
    }
  });
  
  const user=mongoose.model('user', UserSchema);
  module.exports = user;
  user.createIndexes();

  //m.m le schema bata euta model banaune, user is model ko name,UserSchema is schema