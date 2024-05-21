import { Car } from "@prisma/client"
import { CarPayload } from "../../interfaces"

export const carDefaultExpects = (data: Car, expectedData: CarPayload) => {
    expect(data.name).toBe(expectedData.name);
    expect(data.description).toBe(expectedData.description);
    expect(data.brand).toBe(expectedData.brand);
    expect(data.year).toBe(expectedData.year);
    expect(data.km).toBe(expectedData.km);
};