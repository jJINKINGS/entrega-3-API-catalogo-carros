import { prisma } from "../../../../prisma/database";
import { partialUpdate } from "../../services";

describe("Car service partial update unit tests", () => {

    beforeAll(async () => {
        await prisma.car.deleteMany();
    });

    beforeEach(async () => {
        await prisma.car.deleteMany();
    });

    test("Should be able to partial update a car by id", async() => {
        const car = {
            name: "Car name",
            description: "Car description",
            brand: "Car brand",
            year: 2023,
            km: 10000
        };

        const createdCar = await prisma.car.create({ data: car });

        const toUpdatePayload = {
            name: "Car example",
            description: "Car description example",
            brand: "Car brand example",
            year: 2023,
            km: 10000
        };

        const receivedValue = await partialUpdate(toUpdatePayload, createdCar.id);

        const expectedValue = {
            id: createdCar.id,
            name: toUpdatePayload.name,
            description: toUpdatePayload.description,
            brand: toUpdatePayload.brand,
            year: toUpdatePayload.year,
            km: toUpdatePayload.km
        }

        expect(receivedValue).toEqual(expectedValue);
        

        const updatedCar = await prisma.car.findUnique({
            where: { id: createdCar.id },
        });

        expect(updatedCar).toEqual(expectedValue);
    });


    test("Should throw an error if partial updating a car with non existing id", async() => {
        const nonExistingId = "kkkkkkkkkkk";

        await expect(partialUpdate({}, nonExistingId)).rejects.toThrow(
            "Car not found"
        );

    });
});