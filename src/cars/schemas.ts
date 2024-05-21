import { z } from "zod";

const carSchema = z.object({
    id: z.string(),
    name: z.string().max(100),
    description: z.string().nullish(),
    brand: z.string().max(100),
    year: z.number().positive(),
    km: z.number().nonnegative()
});

const carPayloadSchema = carSchema.omit({ id: true });
const carUpdatePayloadSchema = carPayloadSchema.partial();

export { carSchema, carPayloadSchema, carUpdatePayloadSchema };
