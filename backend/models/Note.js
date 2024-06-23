const mongoose = require('mongoose');
const { Schema } = mongoose;


//schema ho kyare yo

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user' //User model ko const user=mongoose.model('user', UserSchema); bata lyako 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, //required means hunai parne 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes', NotesSchema); //'notes' vanne variable/naam chai db ma collection ko naam huncha

  //m.m le schema bata euta model banaune, notes is model ko name,NotesSchema is schema