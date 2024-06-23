import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { OrderValidation } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validateData = OrderValidation.parse(orderData);

    const result = await OrderService.createOrderIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    const err = error as Error; 
    if (err.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else if (
      err.message === 'Insufficient quantity available in inventory'
    ) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Product not found',
        error: err.message,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query.email as string;
    const result = await OrderService.getOrdersFormDB(query);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (error) {
    const err = error as Error; 
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrders,
};
