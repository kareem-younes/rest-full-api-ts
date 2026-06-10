
import {body,validationResult} from "express-validator"
import {validateBody} from "../../../middlewares/body-validate"
import  { Request, Response, Router } from 'express';
import {listOfProducts,getProductById, createProduct, updateProduct, deleteProduct} from './products.controller';
const routes = Router();

routes.get("/",listOfProducts);

routes.get("/:id", getProductById);

routes.post("/", createProduct);
routes.put("/:id",validateBody(), updateProduct);
routes.delete("/:id", deleteProduct);

export default routes;