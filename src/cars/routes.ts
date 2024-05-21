import { Router } from "express";
import { createController, destroyController, listController, partialUpdateController, retrieveController } from "./controller";
import { bodyIsValid, idExists } from "../middleware";
import { carPayloadSchema, carUpdatePayloadSchema } from "./schemas";


export const carRouter = Router();

carRouter.post("/", bodyIsValid(carPayloadSchema), createController);
carRouter.get("/", listController);
carRouter.get("/:carId", idExists, retrieveController);
carRouter.delete("/:carId", idExists, destroyController);
carRouter.patch("/:carId", idExists, bodyIsValid(carUpdatePayloadSchema), partialUpdateController);