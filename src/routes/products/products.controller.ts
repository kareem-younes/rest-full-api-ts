
import { asyncW } from './../../../middlewares/asyincWrapper';
import appError from "../../../utils/appError"
import { NextFunction, Request,Response } from 'express';
import { eq } from "drizzle-orm";
import {body,validationResult} from "express-validator"
import {db} from "../../db/index"
import {productsTable} from"../../db/productsSchema"
import _ from "lodash"
import {createProductSchema} from '../../db/productsSchema';

export let listOfProducts=asyncW(
async (req:Request,res:Response,next:NextFunction)=>{


  let products= await db.select().from(productsTable);

  if(products.length===0){
  let error=new appError(404,"No products found","fail");
  return next(error);

  }



  res.send({status:"success",data:products});



})


export let getProductById=asyncW(

async (req:Request,res:Response,next:NextFunction)=>{
 let id:number=Number(req.params.id);
 if(isNaN(id)){
  let error=new appError(400,"Invalid product id","fail");
  return next(error);
 }
const myP = await db
  .select()
  .from(productsTable)
  .where(eq(productsTable.id, id));
  if(myP.length===0){
    let error=new appError(404,"Product not found","fail");
    return next(error);
  }


res.status(201).send({status:"success",data:myP[0]});
})

export let createProduct= asyncW(
//partial
async(req:Request,res:Response,next:NextFunction)=>{
    
   console.log(req.user);
  try {
    var [product]=  await db.insert(productsTable).values(req.cleanBody).returning();

  } catch (error) {
    let detailsErr = error as Error;
    let err=new appError(500,"error","inital server error",[detailsErr.message]);
    return next(err);
  }



  res.status(201).json(product);





})

export let updateProduct=asyncW(
 async (req:Request,res:Response,next:NextFunction)=>{
  let id:number=Number(req.params.id);
  if(isNaN(id)){
    let error=new appError(400,"Invalid product id","fail");
    return next(error);
   }
   let error=validationResult(req);     
   if(!error.isEmpty()){
    let err=error.array().map((err)=>err.msg).join(",")
    let error1=new appError(400,err,"fail");
    return next(error1);
   }
   let updateProducts=await db.update(productsTable).set(req.body).where(eq(productsTable.id,id)).returning();
 




  res.json({status:"success",data:updateProducts[0]});
})






export let deleteProduct=asyncW(
  async (req:Request,res:Response,next:NextFunction)=>{
    if(isNaN(Number(req.params.id))){
    let error=new appError(400,"Invalid product id","fail");
    return next(error);


    }
    let status=await db.delete(productsTable).where(eq(productsTable.id,Number(req.params.id))).execute();
    if (status.rowCount===0){

      let error=new appError(404,"Product not found","fail");
      return next(error);
    }

    res.send({status:"success",message:"Product deleted successfully"});

  })