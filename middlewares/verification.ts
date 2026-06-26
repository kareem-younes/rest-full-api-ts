
import jwt from "jsonwebtoken"
import { NextFunction, Request,Response } from 'express';
import appError from "../utils/appError.js";
import {asyncW} from "./asyincWrapper.js";
import { UserPayload } from "../types/index.js";
export let verifyToken=asyncW(
(req:Request,res:Response,next:NextFunction)=>{

    let authHeader=req.headers.authorization

    if(!authHeader){

        let error=new appError(401,"you are not authorized to access this route","fail")
        return next(error)

    }
    
    
    let token=authHeader.split(" ")[1]

    jwt.verify(token,"secretkey",(err,decoded)=>{
        if(err){
            
            return next(new appError(401,"invalid token","fail"))
        }
        
            req.user=decoded as UserPayload
            next()
        
    })

        
   
    
   

   


    



})