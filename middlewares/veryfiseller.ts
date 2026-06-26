import { NextFunction, Request,Response } from 'express';
import appError from "../utils/appError.js";
import {asyncW} from "./asyincWrapper.js";


export let verifySeller=asyncW(
(req:Request,res:Response,next:NextFunction)=>{
let user=req.user
if(user!.role!=="seller"){
    let error=new appError(403,"you are not authorized to access this route you are not seller","fail")
    return next(error)
}
next()






})