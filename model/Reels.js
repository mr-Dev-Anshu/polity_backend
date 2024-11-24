import mongoose from "mongoose";

const  schema = mongoose.Schema({
     video:{
         type:String ,
         required:true , 
     }, 

     title:{
         type:String , 
         required:true  
     }, 

     description:{
         type:String , 
         required:true 
     }, 
     thumbnail:{
         type:String , 
         required:false 
     }, 
     userId:{
         type:mongoose.Schema.Types.ObjectId , 
         ref: 'User'
     }, 
     isDown:{
         type:Boolean , 
         default:false 
     }
}) ; 

const Reels = mongoose.model('Reels' , schema) ; 
export default Reels ; 