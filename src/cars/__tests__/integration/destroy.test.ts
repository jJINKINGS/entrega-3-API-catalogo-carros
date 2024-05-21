import supertest from "supertest";
import { prisma } from "../../../../prisma/database"
import { carCreateBodyMock} from "../mocks/car.test"
import { app } from "../../../app";

describe("Car destroy integration tests", () => {

    const request = supertest(app);

    beforeEach(async() => {
        await prisma.car.deleteMany();
    });

    test("Should be able to delete a car by id", async () => {
        const car = await prisma.car.create({ data: carCreateBodyMock });

        await request.delete(`/cars/${car.id}`).expect(204);
    });

    test("Should throw an error if deleting a car with non existing id", async () => {
        const data = await request.delete("/cars/172a92a3-eeb1-483f-ab46-aef48bfad62b").expect(404).then(response => response.body);

        expect(data.message).toBe("Car not found");
    });
})