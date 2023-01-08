import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../errors";
import { IPropertyRequest } from "../interfaces/properties";

export const createPropertyMiddleware =
  (serializer: SchemaOf<IPropertyRequest>) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: any) {
      throw new AppError(error.errors, 400);
    }

    return next();
  };
