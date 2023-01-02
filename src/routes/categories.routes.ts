import { Router } from "express";
import { createCategoryController, getCategoriesController, getOneCategoryController } from "../controllers/category.controllers";
import { isAdmValidationMiddleware, validateUserMiddleware } from "../midllewares/user.middlewares";

const categoryRouter = Router();


categoryRouter.post("/categories", validateUserMiddleware, isAdmValidationMiddleware, createCategoryController );

categoryRouter.get("/categories",  getCategoriesController );

categoryRouter.get("/categories/:id",  getOneCategoryController);



export default categoryRouter