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
    const query = req.query.searchTerm as string;
    const result = await productService.getProductsFromDB(query);

    if (query) {
      res.status(200).json({
        success: true,
        message: `Products matching search term ${query} fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'An error occurred.',
      error: error,
    });
  }
};

// get single products
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productQuery = req.query;
    console.log(productQuery, 'query');
    const result = await productService.getAProductFromDB(productId);
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

// update a single products
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const result = await productService.updateAProductFromDB(
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

// delete a single products
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteAProductFromDB(productId);

    const responseData = result ? null : result;

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: responseData,
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
  deleteSingleProduct,
};
