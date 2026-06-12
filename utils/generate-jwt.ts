import jwt from "jsonwebtoken"

export let generateJWT=(payload:{id:number,email:string,role:string})=>{
let token=jwt.sign({id:payload.id,email:payload.email,role:payload.role},"secretkey",{expiresIn:"1h"})


return token
}