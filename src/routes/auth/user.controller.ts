import { asyncW } from './../../../middlewares/asyincWrapper';
import { NextFunction, Request,Response } from 'express';



export let loginUser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
        res.send("login user")


    }



)
export let registerUser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
     console.log(req.cleanBody)
     res.send("register user")

    }
)

export let alluser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
        res.send("all users")   
    }
    
)    