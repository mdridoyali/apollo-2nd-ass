import { OrderInterface } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: OrderInterface) => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
