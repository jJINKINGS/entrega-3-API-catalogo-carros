import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const bodyIsValid = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);

    return next();
};