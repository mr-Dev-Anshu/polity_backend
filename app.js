import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createData, deleteData, readData } from './utils/cache.js';
import { verifyToken } from './middleware/auth.js';
import signUpRouter from './router/user.js' ; 
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
dotenv.config({
  path: "./.env",
});
app.use(cors(corsOptions));

app.get("/" , verifyToken ,  async (req , res)=> {
      const data = await  readData('count' , 'value') ; 
      if (data){
        console.log("Mili")
        // deleteData('count')
         return res.status(200).json(data) ; 
      }

      let count = 0 ; 
      for(let i = 0 ; i<10000000000; i++) {
         count ++ ; 
      } 
      await createData('count', 'value', count); 
      return res.status(200).json(count) ; 
} )

// app.get("/" , verifyToken); 
app.use('/api/v1/users' , signUpRouter ) ; 
export{app}; 
