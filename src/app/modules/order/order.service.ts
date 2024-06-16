import { OrderInterface } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: OrderInterface) => {
  const result = await OrderModel.create(order);
  return result;
};

const getOrdersFormDB = async (email?: string) => {
  let result;
  if (email) {
    result = await OrderModel.find({ email });
  } else {
    result = await OrderModel.find();
  }
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFormDB,
};
