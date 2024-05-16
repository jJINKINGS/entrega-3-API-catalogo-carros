import { prisma } from "../../../../prisma/database";
import { destroy } from "../../services";

describe("Car service delete unit tests", () => {

    beforeAll(async () => {
        await prisma.car.deleteMany();
    });

    test("Should be able to delete a car by id", async() => {
        const car = {
            name: "Car name",
            description: "Car description",
            brand: "Car brand",
            year: 2023,
            km: 10000
        };

        const createdCar = await prisma.car.create({ data: car });


        await destroy(createdCar.id);
        
        const cars = await prisma.car.findMany();

        expect(cars).toEqual([]);
    });


    test("Should throw an error if deleting a car with non existing id", async() => {
        const nonExistingId = "kkkkkkkkkkk";

        await expect(destroy(nonExistingId)).rejects.toThrow(
            "Car not found"
        );

    });
})