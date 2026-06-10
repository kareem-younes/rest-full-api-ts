
import {body} from "express-validator"
export let validateBody=()=>{


    return [body("name").notEmpty().withMessage("name is notFound").isLength({max:15}).withMessage("max length is 15"),body("price").notEmpty().withMessage("price is not exist")]
}