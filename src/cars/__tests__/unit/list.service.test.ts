import { prisma } from "../../../../prisma/database";
import { list } from "../../services";

describe("Car service list unit tests", () => {

    beforeAll(async () => {
        await prisma.car.deleteMany();
    });

    test("Should be able to list all cars", async() => {
        
        const validTestCars = [
            {
                name: "Car 1",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
            {
                name: "Car 2",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
            {
                name: "Car 3",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
        ];

        await prisma.car.createMany({ data: validTestCars });

        const receivedValues = await list();

        const expectedValue = [
            {
                id: expect.any(String),
                name: "Car 1",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
            {
                id: expect.any(String),
                name: "Car 2",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
            {
                id: expect.any(String),
                name: "Car 3",
                description: "Car description",
                brand: "Car brand",
                year: 2023,
                km: 10000
            },
        ];


        expect(receivedValues).toEqual(expectedValue);
    })
})