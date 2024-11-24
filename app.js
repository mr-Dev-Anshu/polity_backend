import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './router/user.js';
import cookieParser from 'cookie-parser';
import reelsRouter from './router/reels.js';
import followRouter from './router/follow.js';
import reportRouter from './router/report.js';
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
dotenv.config({
  path: "./.env",
});

// app.get("/" , verifyToken ,  async (req , res)=> {
//       const data = await  readData('count' , 'value') ; 
//       if (data){
//         console.log("Mili")
//         // deleteData('count')
//          return res.status(200).json(data) ; 
//       }

//       let count = 0 ; 
//       for(let i = 0 ; i<10000000000; i++) {
//          count ++ ; 
//       } 
//       await createData('count', 'value', count); 
//       return res.status(200).json(count) ; 
// } )

// app.get("/" , verifyToken); 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reels', reelsRouter);
app.use('/api/v1/follow', followRouter);
app.use('/api/v1/report', reportRouter);

export { app };