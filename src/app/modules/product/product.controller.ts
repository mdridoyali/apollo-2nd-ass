import { Request, Response } from 'express';
import { productService } from './product.service';
import { ProductValidation } from './product.validation';

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    //validate data using zod
    const productValidationData = ProductValidation.parse(productData);

    const result = await productService.createProductIntoDB(
      productValidationData,
    );

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while getting the products.',
      error: error,
    });
  }
};

// get single products
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'The product is not found',
      error: error,
    });
  }
};

// get single products
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    console.log(productId);
    console.log(productData);
    const result = await productService.updateSingleProductFromDB(
      productId,
      productData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
};
