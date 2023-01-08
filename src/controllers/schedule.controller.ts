import { Request, Response } from "express";

import {
  createScheduleService,
  getSchedulesService,
} from "../services/schedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const ee = await createScheduleService(req.body, req.user.id);
  return res.status(201).json({ message: "schadule created" });
  
};

export const getScheduleController = async (req: Request, res: Response) => {
  const getPropertySchedules = await getSchedulesService(req.params.id);
  return res.status(200).json(getPropertySchedules);
};
