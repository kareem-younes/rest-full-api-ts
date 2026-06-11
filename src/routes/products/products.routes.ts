import {z} from "zod"
import { productsTable } from "../../db/productsSchema";
import {body,validationResult} from "express-validator"
import {validateBody} from "../../../middlewares/body-validate"
import  { Request, Response, Router } from 'express';
import {listOfProducts,getProductById, createProduct, updateProduct, deleteProduct} from './products.controller';
import { validateData } from "../../../middlewares/bodyValidateWithZod";
import {createProductSchema}from "../../db/productsSchema"
const routes = Router();

// let createProductSchema =z.object({
//     name:z.string().min(3).max(50),
//     description:z.string().max(500).optional(),
//     price:z.number({message:"price should be a number"}).positive(),
//     img_Url:z.string().url().optional(),

// })

// type productsType=z.infer<typeof createProductSchema>
routes.get("/",listOfProducts);

routes.get("/:id", getProductById);

routes.post("/",validateData(createProductSchema) ,createProduct);
routes.put("/:id",validateBody(), updateProduct);
routes.delete("/:id", deleteProduct);

export default routes;