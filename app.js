import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './router/user.js';
import cookieParser from 'cookie-parser';
import reelsRouter from './router/reels.js';
import followRouter from './router/follow.js';
import reportRouter from './router/report.js';
import channelRouter from './router/channel.js'
import { putObject } from './controller/upload.js';

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://master.dw8kmiy5kau5k.amplifyapp.com' , 'https://master.d203wypx8gnf3n.amplifyapp.com'], credentials: true }));
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
app.post("/api/putObject", putObject);
app.use('/api/v1/channels' , channelRouter);
// sendEmail(
//   'anshur9608837@gmail.com',
//   'Test Email Subject',
//   'This is the plain text body of the email.',
//   '<h1>This is the HTML body of the email.</h1>'
// );
export { app };



