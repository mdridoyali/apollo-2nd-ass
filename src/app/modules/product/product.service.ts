import { ProductInterface } from './product.interface';
import ProductModel from './product.model';

//create product
const createProductIntoDB = async (product: ProductInterface) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getProductsFromDB = async (searchTerm: string) => {
  console.log(searchTerm, 'searchTerm');
  const filterData: any = {};

  if (searchTerm) {
    filterData.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await ProductModel.find(filterData);
  return result;
};

// get single product
const getAProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

// update a product
const updateAProductFromDB = async (id: string, productData: object) => {
  const result = await ProductModel.findByIdAndUpdate(id, productData, {
    new: true,
  });
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

// delete a product
const deleteAProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);

  return result;
};

export const productService = {
  createProductIntoDB,
  getProductsFromDB,
  getAProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDB,
};
