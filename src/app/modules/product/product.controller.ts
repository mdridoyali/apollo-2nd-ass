import { productService } from './product.service';

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const result = await productService.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const ProductControllers = {
  createProduct,
};
