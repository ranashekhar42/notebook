const mongoose=require('mongoose')
const { Schema } = mongoose;
const NotesSchema = new Schema({
   title:{
    type :String,
    require:true
   },
   description: {
    type :String,
    require:true
   },
   tag:{
    type :String,
    default:"Genaral"
    
   },
   date:{
    type :Date ,
    default:true
   }
})

module.exports = mongoose.model('notes',NotesSchema)