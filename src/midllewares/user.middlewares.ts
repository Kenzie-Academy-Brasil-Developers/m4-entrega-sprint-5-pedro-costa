import { NextFunction, Request, Response } from "express";
import { AnySchema, SchemaOf} from "yup";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";
import { IUserRequest } from "../interfaces/users";

export const createUserMiddleware =
  (serializer: SchemaOf<IUserRequest>) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const validated = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error:any) {
      throw new AppError(error.errors, 400);
    }
   



    return next();
  };

export const validateUserMiddleware = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("token is required", 401);
  }

  const token = authToken.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError("token is invalid", 401);
    }
    req.user = { isAdm: decoded.isAdm, id: decoded.sub };
  });

  return next();
};

export const LoginUserMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const userRepo = AppDataSource.getRepository(Users);
    const findUser = await userRepo.findOneBy({ email: req.body.email });
    const passwordMatch = await compare(req.body.password, findUser!.password);

    if (!passwordMatch) {
      throw new AppError("email or password is  invalid", 403);
    }

    return next();
  } catch (error) {
    throw new AppError("email or password is  invalid", 403);
  }
};

export const updateUserMiddleware =
  (serializer: AnySchema) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    const loggedUser = req.user;

    if (!loggedUser.isAdm && loggedUser.id !== req.params.id) {
      throw new AppError("only adm user can edit de data of other users", 401);
    }

    const validated = await serializer.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    return next();
  };

export const isAdmValidationMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(Users);
  const findUser = await userRepo.findOneBy({ id: req.user.id });

  
  if (!findUser?.isAdm) {
    throw new AppError("just adm user is allowed", 403);
  }

  return next();
};
