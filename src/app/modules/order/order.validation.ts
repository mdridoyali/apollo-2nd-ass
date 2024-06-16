import { z } from 'zod';

// Product Validation
const OrderValidation = z.object({
  email: z.string().min(1, 'Email is required'),
  productId: z.string().min(1, 'ProductId is required'),
  price: z.number().min(0, 'Product price is required'),
  quantity: z.number().min(1, 'Product quantity is required'),
});

export { OrderValidation };
