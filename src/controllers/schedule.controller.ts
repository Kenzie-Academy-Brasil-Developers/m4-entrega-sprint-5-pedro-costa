import { Request, Response } from "express";

import { createScheduleService } from "../services/schedule.service";

 export const createScheduleController = async (req:Request, res: Response) => {
  const createSchedule = await createScheduleService(req.body);
    return res.status(201);
 }




