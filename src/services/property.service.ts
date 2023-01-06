import { And, PersistedEntityNotFoundError } from "typeorm";
import AppDataSource from "../data-source";
import { Addresses } from "../entities/addresses.entity";
import { Categories } from "../entities/categories.entity";
import { Properties } from "../entities/properties.entity";
import { AppError } from "../errors";
import { IPropertyRequest } from "../interfaces/properties";

export const createPropertyService = async (body: IPropertyRequest) => {
  const propertyRepo = AppDataSource.getRepository(Properties);
  const addressRepo = AppDataSource.getRepository(Addresses);
  const categoryRepo = AppDataSource.getRepository(Categories);

  const findAddress = await addressRepo.findOneBy({
    number: body.address.number,
    zipCode: body.address.zipCode,
  });

  if (findAddress) {
    throw new AppError("propty already exist ", 409);
  }

  const { address: addressData, ...propertyData } = body;
  const createAdress = addressRepo.create(addressData);
  await addressRepo.save(createAdress);

  const findCategory = await categoryRepo.findOneBy({ id: body.categoryId });
  if (!findCategory) {
    throw new AppError("category not found", 404);
  }

  const propertyResponse = {
    ...propertyData,
    address: createAdress,
    category: findCategory,
  };

  const createProperty = propertyRepo.create(propertyResponse);

  return await propertyRepo.save(createProperty);

  {
  }
};

export const getPropertiesService = async () => {
  const propertyRepo = AppDataSource.getRepository(Properties);

  return await propertyRepo.find();
};
