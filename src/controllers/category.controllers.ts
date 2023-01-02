import { Request, Response } from "express";
import { createCategoryService, getCategoriesService, getOneCategoryService,  } from "../services/category.service";



export const createCategoryController = async (req: Request, res: Response) => {
    const crateCategory = await createCategoryService(req.body);
    return res.status(201).json(crateCategory);
  };



  
  export const getCategoriesController = async (req: Request, res: Response) => {
    const getCategories = await getCategoriesService();
    return res.status(200).json(getCategories);
  };

  export const getOneCategoryController = async (req: Request, res: Response) => {
    const getCategory = await getOneCategoryService(req.params.id);
    return res.status(200).json(getCategory);
  };