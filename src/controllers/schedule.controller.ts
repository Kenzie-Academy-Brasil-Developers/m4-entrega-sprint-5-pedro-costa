import { Request, Response } from "express";

import { createScheduleService, getSchedulesService } from "../services/schedule.service";

 export const createScheduleController = async (req:Request, res: Response) => {
  const schedule =  await createScheduleService(req.body, req.user.id);
    return res.status(201).json(schedule);
 }




 export const getScheduleController = async (req: Request, res: Response) => {
   const getCategories = await getSchedulesService();
   return res.status(200).json(getCategories);
 };
