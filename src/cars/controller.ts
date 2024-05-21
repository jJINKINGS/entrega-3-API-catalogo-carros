import { Request, Response } from "express";
import { create, destroy, list, partialUpdate, retrieve } from "./services";

export const createController = async(req: Request, res: Response): Promise<Response> => {
    const createdCar = await create(req.body);

    return res.status(201).json(createdCar);
};

export const listController = async(req: Request, res: Response): Promise<Response> => {
    const listCars = await list();

    return res.status(200).json(listCars);
};

export const retrieveController = async(req: Request, res: Response): Promise<Response> => {
    const carId = req.params.carId;
    const car = await retrieve(carId);
    return res.status(200).json(car);
};

export const destroyController = async(req: Request, res: Response): Promise<Response> => {
    const carId = req.params.carId;
    const car = await destroy(carId);
    return res.status(204).json(car);
};

export const partialUpdateController = async(req: Request, res: Response): Promise<Response> => {
    const carId = req.params.carId;
    const updateCar = await partialUpdate(req.body, carId);
    return res.status(200).json(updateCar);
};

