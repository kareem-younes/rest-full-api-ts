import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import  appError  from '../utils/appError';
import _ from 'lodash';
import { createProductSchema } from '../src/db/productsSchema';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //take zod schema
      schema.parse(req.body);
      //pick only the keys that are in the schema
      req.cleanBody=_.pick(req.body, Object.keys(schema.shape));

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        let middleWareError = new appError(400, "Validation Error", 'fail', errorMessages);
        next(middleWareError);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}