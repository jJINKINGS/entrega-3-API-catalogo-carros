import { prisma } from "../../../../prisma/database";
import supertest from "supertest";
import { app } from "../../../app";

describe("Car create integration tests", () => {
    const request = supertest(app);

    const endpoint = "/cars";


    beforeEach(async() => {
        await prisma.car.deleteMany();
    });


    test("Should be able to create a car sucessfully", async() => {
        const validPayload = {
            name: "Car name",
            description: "Car description",
            brand: "Car brand",
            year: 2023,
            km: 10000
        };

        const response = await request.post(endpoint).send(validPayload);

        const expectedResponseBody = {
            id: expect.any(String),
            name: validPayload.name,
            description: validPayload.description,
            brand: validPayload.brand,
            year: validPayload.year,
            km: validPayload.km
        };


        expect(response.body).toEqual(expectedResponseBody);
        expect(response.status).toBe(201);
    });


    test("Should return an error if creating a car without required keys", async() => {
        const invalidPayload = {};

        const response = await request.post(endpoint).send(invalidPayload);

        expect(response.body.errors).toBeDefined();

        
        const requiredKeys = ['name', 'brand', 'year', 'km'];
        const receivedKeys = Object.keys(response.body.errors);
        expect(receivedKeys).toEqual(requiredKeys);


        requiredKeys.forEach((requiredKey) => {
            expect(response.body.errors[requiredKey]).toContain("Required");
        });
    });


    test("Should return an error if creating a car with name field more than 100 characters", async() => {
        const invalidNameCar = {
            name: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
            description: "description",
            brand: "brand",
            year: 2024,
            km: 10000
        };

        const response = await request.post(endpoint).send(invalidNameCar);

        expect(response.body.errors).toBeDefined();

        const expectedResponseBody = {
            errors: {name: ["String must contain at most 100 character(s)"]},
        }

        expect(response.body).toEqual(expectedResponseBody);
        expect(response.statusCode).toBe(400);
    });


    test("Should return an error if creating a car with brand field more than 100 characters", async() => {
        const invalidBrandCar = {
            name: "name car",
            description: "description",
            brand: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
            year: 2024,
            km: 10000
        };

        const response = await request.post(endpoint).send(invalidBrandCar);

        expect(response.body.errors).toBeDefined();

        const expectedResponseBody = {
            errors: {brand: ["String must contain at most 100 character(s)"]},
        }

        expect(response.body).toEqual(expectedResponseBody);
        expect(response.statusCode).toBe(400);
    });
});