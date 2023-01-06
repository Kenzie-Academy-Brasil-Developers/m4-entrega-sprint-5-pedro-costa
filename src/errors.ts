import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

interface IAppErrorResponse {
  message: string;
}

class AppError extends Error {
  statusCode: number;
  response: IAppErrorResponse;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.response = { message };
    this.statusCode = statusCode;
  }
}

 const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.response);
  }
  if (err instanceof ValidationError) {
    
    return res.status(401).json({ message: err.errors });
  }

 return res.status(500).json({ message: "internal server error"})
};

export { AppError, errorHandler };
