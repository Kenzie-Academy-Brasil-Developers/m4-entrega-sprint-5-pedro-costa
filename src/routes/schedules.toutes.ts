import { Router } from "express";
import { createScheduleController } from "../controllers/schedule.controller";

export const scheduleRouter = Router();

scheduleRouter.post("/schedules", createScheduleController);
//  scheduleRouter.get("/schedules",  );
