import { asyncW } from './../../../middlewares/asyincWrapper';
import { NextFunction, Request,Response } from 'express';
import bcrypt from 'bcryptjs'
import{db} from "../../db/index"
import { userTable } from '../../db/userSchema';
import { eq } from 'drizzle-orm';
import appError from "../../../utils/appError"
import jwt from"jsonwebtoken"
import { generateJWT } from '../../../utils/generate-jwt';




export let loginUser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
        let {email,password}=req.cleanBody
        let [user]=await db.select().from(userTable).where(eq(userTable.email,email))
        if(!user){
            let error=new appError(400,"email is not exist","fail")
            return next(error)


        }
        
        
        let comperePassword= await bcrypt.compare(password,user.password)
        if(!comperePassword){
            let error=new appError(400,"invalid password","fail")
            return next(error)
        }

        let token=generateJWT({id:user.id,email:user.email,role:user.role})

        res.status(200).json({message:"login successfully",token})




    }



)
export let registerUser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
    let hashedPassword=await bcrypt.hash(req.cleanBody.password,10)
    let {email}=req.cleanBody
    let [chackuser]=await db.select().from(userTable).where(eq(userTable.email,email))
    if
    (chackuser){
        let error=new appError(400,"email is already exist","fail")
        return next(error)
    }
    let [user]=await db.insert(userTable).values({...req.cleanBody,password:hashedPassword}).returning()
            res.status(203).json({message:"user registered successfully",user})

    }
)

export let alluser=asyncW(
    async (req:Request,res:Response,next:NextFunction)=>{
        res.send("all users")   
    }
    
)    