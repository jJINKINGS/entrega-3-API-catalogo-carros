import { prisma } from "../../../../prisma/database";
import { retrieve } from "../../services";

describe("Car service retrieve unit tests", () => {

    beforeEach(async () => {
        await prisma.car.deleteMany();
    });

    test("Should be able to retrieve a car by id", async() => {
        const car = {
            name: "Car name",
            description: "Car description",
            brand: "Car brand",
            year: 2023,
            km: 10000
        };

        const createdCar = await prisma.car.create({ data: car });


        const receivedValue = await retrieve(createdCar.id);
        const expectedValue = {
            id: createdCar.id,
            name: car.name,
            description: car.description,
            brand: car.brand,
            year: car.year,
            km: car.km
        };

        expect(receivedValue).toEqual(expectedValue);
    });


    test("Should throw an error if retrieving a car with no existing id", async() => {

    });
})