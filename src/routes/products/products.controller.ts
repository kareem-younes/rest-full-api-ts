import { asyncW } from './../../../middlewares/asyincWrapper';
import appError from "../../../utils/appError"
import { NextFunction, Request,Response } from 'express';
import { eq } from "drizzle-orm";

import {db} from "../../db/index"
import {productsTable} from"../../db/productsSchema"

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

async(req:Request,res:Response)=>{

let [product]=  await db.insert(productsTable).values(req.body).returning();
res.status(201).json(product);





})

export let updateProduct=(req:Request,res:Response)=>{


res.send("Product updated successfully");
}

export let deleteProduct=(req:Request,res:Response)=>{

res.send("Product deleted successfully");

}