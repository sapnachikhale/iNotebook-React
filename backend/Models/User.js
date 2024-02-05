const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
         type:String,
         required:true
    },
   email:{
        type:String,
        required:true,
        Unique:true
   },
   password:{
    type:String,
    required:true
},
date:{
    type:Date,
    Default:(`Date.now`)
}
    }
  );
  const User=mongoose.model('user',UserSchema);
  module.exports =User; 