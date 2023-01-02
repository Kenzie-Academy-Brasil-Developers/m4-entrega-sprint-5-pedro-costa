import { Router } from "express";
import { createCategoryController, getCategoriesController, getOneCategoryController } from "../controllers/category.controllers";
import { isAdmValidationMiddleware, validateUserMiddleware } from "../midllewares/user.middlewares";

const categoryRouter = Router();


categoryRouter.post("/categories", validateUserMiddleware, isAdmValidationMiddleware, createCategoryController );

categoryRouter.get("/categories",  getCategoriesController );

categoryRouter.get("/categories/:id",  getOneCategoryController);

// categoryRouter.post("/login", LoginUserMiddleware, loginUsersController);

// categoryRouter.patch("/users/:id", validateUserMiddleware,  updateUserMiddleware(patchUserShape),  patchUserController);

// categoryRouter.delete("/users/:id",  validateUserMiddleware,  isAdmValidationMiddleware, deleteUserController);


export default categoryRouter