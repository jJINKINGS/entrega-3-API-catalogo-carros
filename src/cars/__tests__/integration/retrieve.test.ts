import { prisma } from "../../../../prisma/database";
import supertest from "supertest";
import { app } from "../../../app";
import {  carCreateBodyMock } from "../mocks/car.test";


describe("Car retrieve integration tests", () => {
    const request = supertest(app);

    beforeEach(async() => {
        await prisma.car.deleteMany();
    });


    test("Should be able to retrieve a car by id", async() => {
        const car = await prisma.car.create({ data: carCreateBodyMock });

        const data = await request.get(`/cars/${car.id}`).expect(200).then(response => response.body);

        expect(data).toStrictEqual(car);
    });

    test("Should throw an error if retrieving a car with non existing id", async () => {
        const data = await request.get("/cars/172a92a3-eeb1-483f-ab46-aef48bfad62b").expect(404).then(response => response.body);

        expect(data.message).toBe("Car not found");
    });
});