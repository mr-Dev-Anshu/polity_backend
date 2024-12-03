import mongoose from "mongoose";

const schema = mongoose.Schema({
      name:{
         type:String 
      } , 
      niche:{
         type:String 
      } , 
      language:{
        type:String
      },
      email:{
         type:String 
      }
})

const Channel = mongoose.model("Channel" , schema) ; 
export default Channel ; 