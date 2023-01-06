import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getPropertiesCategoryController,
} from "../controllers/category.controllers";
import {
  isAdmValidationMiddleware,
  validateUserMiddleware,
} from "../midllewares/user.middlewares";

const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  validateUserMiddleware,
  isAdmValidationMiddleware,
  createCategoryController
);

categoryRouter.get("/categories", getCategoriesController);

categoryRouter.get(
  "/categories/:id/properties",
  getPropertiesCategoryController
);

export default categoryRouter;
