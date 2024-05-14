import {prisma} from "../../prisma/database";
import { Car, CarPayload } from "./interfaces";

export const create = async(payload: CarPayload): Promise<Car> => {
    const newCar = await prisma.car.create({ data: payload });

    return newCar;
};

export const list = async(): Promise<Array<Car>> => {
    return await prisma.car.findMany();
};

export const retrieve = async(carId: string) => {
    const car = await prisma.car.findUnique({
        where: {id: carId}
    });

    return car;
};