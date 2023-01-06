import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleMiddleware =(serializer: SchemaOf<IScheduleRequest>) =>async (req: Request, resp: Response, next: NextFunction) => {

   await serializer.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    return next();
  };