import { prisma } from "../../../../prisma/database";
import supertest from "supertest";
import { app } from "../../../app";

describe("Cars list integration tests", () => {
    const request = supertest(app);

    const endpoint = "/cars";


    beforeEach(async() => {
        await prisma.car.deleteMany();
    });


    test("Should be able to list all cars", async() => {
        // const validTestCars = [
        //     {   
        //         name: "Car 1",
        //         description: "Car description",
        //         brand: "Car brand",
        //         year: 2023,
        //         km: 10000
        //     },
        //     {   
        //         name: "Car 2",
        //         description: "Car description",
        //         brand: "Car brand",
        //         year: 2023,
        //         km: 10000
        //     },
        //     {   
        //         name: "Car 3",
        //         description: "Car description",
        //         brand: "Car brand",
        //         year: 2023,
        //         km: 10000
        //     },
        // ];

        // await prisma.car.createMany({ data: validTestCars });

        const response = await request.get(endpoint);

        const expectedResponse = [
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


        expect(response).toEqual(expectedResponse);
        expect(response.status).toBe(200);
    });
});