import {prisma} from "../../prisma/database";
import { ApiError } from "../errors/ApiError";
import { Car, CarPayload } from "./interfaces";

export const create = async(payload: CarPayload): Promise<Car> => {
    const newCar = await prisma.car.create({ data: payload });

    return newCar;
};

export const list = async(): Promise<Array<Car>> => {
    return await prisma.car.findMany();
};

export const retrieve = async(carId: string): Promise<Car> => {
    const car = await prisma.car.findUnique({
        where: {id: carId}
    });

    if(!car){
        throw new ApiError('Car not found', 404);
    }

    return car;
};


export const destroy = async(carId: string) => {
    await retrieve(carId);

    await prisma.car.delete({ where: { id: carId }});
};


export const partialUpdate = async(payload: Partial<CarPayload>, carId: string) => {
    await retrieve(carId);

    const updatedCar = await prisma.car.update({ 
        where: {id: carId},
        data: payload
    });

    return updatedCar;
};

