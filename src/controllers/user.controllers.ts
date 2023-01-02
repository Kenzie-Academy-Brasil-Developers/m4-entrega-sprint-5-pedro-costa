import { Request, Response } from "express";
// import { IUser } from "../interfaces/users";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  loginUserService,
  patchUserService,
} from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const crateUser = await createUserService(req.body);
  return res.status(201).json(crateUser);
};

export const getUsersController = async (req: Request, res: Response) => {
  const getUser = await getUsersService();

  return res.status(200).json(getUser);
};

export const loginUsersController = async (req: Request, res: Response) => {
  const loginUser = await loginUserService(req.body);

  return res.status(200).json(loginUser);
};

export const patchUserController = async (req: Request, res: Response) => {
  const patchUser = await patchUserService(req.body, req.params.id);
  return res.status(200).json(patchUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const loginUser = await deleteUserService(req.params.id);

  res.status(204).send();
};
