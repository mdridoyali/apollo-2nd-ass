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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query.email as string;
    const result = await OrderService.getOrdersFormDB(query);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrders,
};
