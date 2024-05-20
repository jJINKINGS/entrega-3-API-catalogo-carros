import { Request, Response } from "express";
import { create, list } from "./services";

export const createController = async(req: Request, res: Response): Promise<Response> => {
    const createdCar = await create(req.body);

    return res.status(201).json(createdCar);
}

export const listController = async(req: Request, res: Response): Promise<Response> => {
    const listCars = await list();

    return res.status(201).json(listCars);
}