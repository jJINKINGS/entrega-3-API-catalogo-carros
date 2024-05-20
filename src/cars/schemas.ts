import { z } from "zod";

const carSchema = z.object({
    id: z.string().max(36),
    name: z.string().max(100),
    description: z.string().nullish(),
    brand: z.string().max(100),
    year: z.number().positive(),
    km: z.number().positive()
});

const carPayloadSchema = carSchema.omit({ id: true });

export { carSchema, carPayloadSchema };

// model Car {
//     id          String  @db.VarChar(36) @id @default(uuid())
//     name        String  @db.VarChar(100)
//     description String? @db.Text
//     brand       String  @db.VarChar(100)
//     year        Int
//     km          Int 
//   }