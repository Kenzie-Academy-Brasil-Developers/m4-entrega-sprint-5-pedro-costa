import { Router } from "express";
import {
  createPropertyController,
  getPropertyController,
} from "../controllers/property.controllers";
import { createPropertyMiddleware } from "../midllewares/properties.middlewares";
import {
  isAdmValidationMiddleware,
  validateUserMiddleware,
} from "../midllewares/user.middlewares";
import { createpropertyShape } from "../schemas/property.schemas";

export const propertyRouter = Router();

propertyRouter.post(
  "/properties",
  validateUserMiddleware,
  isAdmValidationMiddleware,
  createPropertyMiddleware(createpropertyShape),
  createPropertyController
);

propertyRouter.get("/properties", getPropertyController);
