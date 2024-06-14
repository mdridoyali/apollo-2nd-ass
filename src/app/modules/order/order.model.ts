import { OrderInterface } from './order.interface';
import { model, Schema } from 'mongoose';

// Define the Order schema
const OrderSchema = new Schema<OrderInterface>({
  email: { type: String, required: [true, 'Email is required'] },
  productId: { type: String, required: [true, 'Product ID is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

// Create the Order model
const OrderModel = model<OrderInterface>('Order', OrderSchema);

export default OrderModel;
