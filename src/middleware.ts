import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { prisma } from "../prisma/database";

export const bodyIsValid = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);

    return next();
};

export const idExists = async (req: Request, res: Response, next: NextFunction) => {
    const foundCar = await prisma.car.findFirst({
        where: {
            id: req.params.carId,
        }
    });

    if(!foundCar) {
        return res.status(404).json({ message: "Car not found"});
    }

    return next();
};


