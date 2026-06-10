import { db } from './db/index';


import express , { NextFunction, Request, Response } from 'express';
import productRoutes from './routes/products/products.routes.js';

let app=express();

let router=express.Router();




app.use(express.json());

app.use("/products",productRoutes);

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{

res.status(err.statusCode).json({message:err.message,status:err.status,});

})

app.listen(3000,()=>{

console.log('Server is running on port 3000');

})