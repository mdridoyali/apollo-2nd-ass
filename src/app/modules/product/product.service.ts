import { ProductInterface } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (product: ProductInterface) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
};
