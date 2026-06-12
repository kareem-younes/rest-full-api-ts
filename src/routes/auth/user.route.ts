import express from "express";
import { NextFunction, Request, Response } from 'express';
import {registerUser, loginUser,alluser} from "./user.controller"
import { validateData } from "../../../middlewares/bodyValidateWithZod";
import { createUserScheama} from "../../db/userSchema";
import {createloginScheama} from "../../db/userSchema";
const routerAuth = express.Router();

routerAuth.get("/allusers",alluser)
routerAuth.post("/register",validateData(createUserScheama),registerUser)
routerAuth.post("/login",validateData(createloginScheama),loginUser)


export default routerAuth;