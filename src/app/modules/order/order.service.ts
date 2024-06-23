import ProductModel from '../product/product.model';
import { OrderInterface } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: OrderInterface) => {
  // Find the product in the inventory
  const product = await ProductModel.findById(order.productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // Check if there is sufficient quantity in inventory
  if (product.inventory.quantity < order.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  // Update the inventory quantity and inStock status
  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  // Create the order
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
