import supertest from "supertest";
import { prisma } from "../../../../prisma/database"
import { carCreateBodyMock, carUpdateBodyMock } from "../mocks/car.test"
import { app } from "../../../app";

describe("Car update integration tests", () => {

    const request = supertest(app);

    beforeEach(async() => {
        await prisma.car.deleteMany();
    });

    
    test("Should be able to update a car", async () => {
        const car = await prisma.car.create({ data: carCreateBodyMock });

        const data = await request.patch(`/cars/${car.id}`).send(carUpdateBodyMock).expect(200).then(response => response.body);

        const updateCar = {...car, ...carUpdateBodyMock };

        expect(data).toStrictEqual(updateCar);
    });


    test("Should throw an error if partial updating a car with non existing id", async () => {
        const data = await request.patch("/cars/172a92a3-eeb1-483f-ab46-aef48bfad62b").expect(404).then(response => response.body);

        expect(data.message).toBe("Car not found");
    });
})