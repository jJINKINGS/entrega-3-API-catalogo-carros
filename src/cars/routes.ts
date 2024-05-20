import { Router } from "express";
import { createController } from "./controller";
import { bodyIsValid } from "../middleware";
import { carPayloadSchema } from "./schemas";


export const carRouter = Router();


carRouter.post("/", bodyIsValid(carPayloadSchema), createController);
carRouter.get("/");
carRouter.get("/:carId");
carRouter.patch("/:carId");
carRouter.delete("/:carId");