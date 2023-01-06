import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";
import {
  IUser,
  IUserLogin,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/users";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

export const createUserService = async (body: IUserRequest): Promise<IUser> => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = userRepo.create(body);
  const findUser = await userRepo.findOneBy({ email: body.email });

  if (findUser) {
    throw new AppError("usuer already exist", 409);
  }

  await userRepo.save(user);
  const { password: removedPasword, ...newBody } = user;

  return newBody;
};

export const getUsersService = async () => {
  const userRepo = AppDataSource.getRepository(Users);

  const findUser = await userRepo.find();

  const treatedData = findUser.map((element) => {
    const { password: removedPassword, ...newBody } = element;
    return newBody;
  });

  return treatedData;
};

export const loginUserService = async (body: IUserLogin): Promise<object> => {
  const userRepo = AppDataSource.getRepository(Users);

  const findUser = await userRepo.findOneBy({ email: body.email });

  if (!findUser) {
    throw new AppError("email or password is incorrect", 401);
  }

  const {isAdm, id } = findUser!;

  const createtoken = jwt.sign({ isAdm }, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
    subject: id,
  });

  const token = {
    token: createtoken,
  };

  return token;
};

export const patchUserService = async (
  data: IUserUpdate,
  userId: string
): Promise<IUserUpdate> => {
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("user no exist", 404);
  }

  const newUserData = await userRepo.update(userId, data);

  const { password: newPassword, ...updatedUser } = data;

  const newUser = userRepo.create({ ...user, ...updatedUser });

  const { password: removedPassword, ...treatedData } = newUser;

  return treatedData;
};

export const deleteUserService = async (userid: string) => {
  const userRepo = AppDataSource.getRepository(Users);

  const findUser = await userRepo.findOneBy({ id: userid });

  if (!findUser) {
    throw new AppError("user no exist", 404);
  }
  if (!findUser.isActive) {
    throw new AppError("user has been deleted", 400);
  }

  findUser!.isActive = false;

  const deleteuser = await userRepo.save(findUser);

  return {};
};
