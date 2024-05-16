import {prisma} from "../../prisma/database";
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
        throw new Error('Car not found');
    }

    return car;
};


export const destroy = async(carId: string) => {
    // const car = await prisma.car.findUnique({
    //     where: {id: carId}
    // });

    // if(!car){
    //     throw new Error('Car not found');
    // }

    await retrieve(carId);

    await prisma.car.delete({ where: { id: carId }});
}


export const partialUpdate = async(payload: Partial<CarPayload>, carId: string) => {
    // const car = await prisma.car.findUnique({
    //     where: {id: carId}
    // });

    // if(!car){
    //     throw new Error('Car not found');
    // }
    await retrieve(carId);


    const updatedCar = await prisma.car.update({ 
        where: {id: carId},
        data: payload
    });

    return updatedCar;
}