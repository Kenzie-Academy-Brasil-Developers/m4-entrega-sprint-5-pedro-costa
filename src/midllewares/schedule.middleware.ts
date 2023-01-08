import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../errors";
import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleMiddleware =
  (serializer: SchemaOf<IScheduleRequest>) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    await serializer.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    const createDate = new Date(req.body.date);
    const weekDay = createDate.getDay();
    const hour = +req.body.hour.split(":")[0];

    if (weekDay === 6 || weekDay === 0) {
      throw new AppError("unavailable date", 400);
    }

    if (hour < 8 || hour >= 18) {
      throw new AppError("unavailable time", 400);
    }

    return next();
  };
