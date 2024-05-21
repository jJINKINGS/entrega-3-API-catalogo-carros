import { prisma } from "../../../../prisma/database";
import supertest from "supertest";
import { app } from "../../../app";
import { carCreateBodyListMock } from "../mocks/car.test";
import { carDefaultExpects } from "../utils/carDefaultExpects";

describe("Cars list integration tests", () => {
    const request = supertest(app);

    beforeEach(async() => {
        await prisma.car.deleteMany();
    });


    test("Should be able to list all cars", async() => {
        await prisma.car.createMany({ data: carCreateBodyListMock });

        const data = await request.get("/cars").expect(200).then(response => response.body);

        expect(data).toHaveLength(2);

        expect(data[0].id).toBeDefined();
        carDefaultExpects(data[0], carCreateBodyListMock[0]);

        expect(data[1].id).toBeDefined();
        carDefaultExpects(data[1], carCreateBodyListMock[1]);
    });
});