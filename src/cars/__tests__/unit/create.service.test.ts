import { prisma } from "../../../../prisma/database";
import { create } from "../../services";

describe("Car service create unit tests", () => {

    beforeEach(async () => {
        await prisma.car.deleteMany();
    });

    test("Should be able to create a car sucessfully", async() => {
        //SETUP - PREPARO OS DADOS PARA REALIZAR AQUELE TEST
        const validTestCar = {
            name: "Car name",
            description: "Car description",
            brand: "Car brand",
            year: 2023,
            km: 10000
        };

        const receivedValue = await create(validTestCar);

        const expectedValue = {
            id: expect.any(String),
            name: validTestCar.name,
            description: validTestCar.description,
            brand: validTestCar.brand,
            year: validTestCar.year,
            km: validTestCar.km
        };
        
        expect(receivedValue).toEqual(expectedValue);

        const createdCar = await prisma.car.findUnique({
            where: {id: receivedValue.id }
        });

        expect(createdCar).toBeTruthy();
    });
});