import express from "express";
import { NextFunction, Request, Response } from 'express';
import {registerUser, loginUser,alluser} from "./user.controller.js"
import { validateData } from "../../../middlewares/bodyValidateWithZod.js";
import { createUserScheama} from "../../db/userSchema.js";
import {createloginScheama} from "../../db/userSchema.js";
const routerAuth = express.Router();

routerAuth.get("/allusers",alluser)
routerAuth.post("/register",validateData(createUserScheama),registerUser)
routerAuth.post("/login",validateData(createloginScheama),loginUser)


export default routerAuth;