import { Router } from "express";
import {
  createScheduleController,
  getScheduleController,
} from "../controllers/schedule.controller";
import { createScheduleMiddleware } from "../midllewares/schedule.middleware";
import {
  isAdmValidationMiddleware,
  validateUserMiddleware,
} from "../midllewares/user.middlewares";
import { createScheduleShape } from "../schemas/schedule.schema";

export const scheduleRouter = Router();

scheduleRouter.post(
  "/schedules",
  validateUserMiddleware,
  createScheduleMiddleware(createScheduleShape),
  createScheduleController
);
scheduleRouter.get(
  "/schedules/properties/:id",
  validateUserMiddleware,
  isAdmValidationMiddleware,
  getScheduleController
);
