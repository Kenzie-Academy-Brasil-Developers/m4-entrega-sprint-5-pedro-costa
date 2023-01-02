import { Router } from "express";
import { createUserController, deleteUserController, getUsersController, loginUsersController, patchUserController} from "../controllers/user.controllers";
import { createUserMiddleware,  isAdmValidationMiddleware,  LoginUserMiddleware,    updateUserMiddleware,    validateUserMiddleware  } from "../midllewares/user.middlewares";
import { createUserShape, patchUserShape } from "../schemas/user.schemas";

const usersRouter = Router();


usersRouter.post("/users", createUserMiddleware(createUserShape), createUserController);

usersRouter.get("/users", validateUserMiddleware, isAdmValidationMiddleware, getUsersController );

usersRouter.post("/login", LoginUserMiddleware, loginUsersController);

usersRouter.patch("/users/:id", validateUserMiddleware,  updateUserMiddleware(patchUserShape),  patchUserController);

usersRouter.delete("/users/:id",  validateUserMiddleware,  isAdmValidationMiddleware, deleteUserController);


export default usersRouter
