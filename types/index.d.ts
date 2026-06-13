// to make the file a module and avoid the TypeScript error
export {};
import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    userId: number;
    role: string;

}

declare global {
  namespace Express {
    export interface Request {
      userId?: number;
      cleanBody?: any
       user?: UserPayload;
    }
  }
}
