import { Schema, model } from 'mongoose';
import {
  InventoryInterface,
  ProductInterface,
  VariantsInterface,
} from './product.interface';

// Define the Variants schema
const VariantsSchema = new Schema<VariantsInterface>({
  type: { type: String, required: [true, 'Variant type is required'] },
  value: { type: String, required: [true, 'Variant value is required'] },
});

// Define the Inventory schema
const InventorySchema = new Schema<InventoryInterface>({
  quantity: {
    type: Number,
    required: [true, 'InventorySchema quantity is required'],
  },
  inStock: { type: Boolean, required: [true, 'In stock status is required'] },
});

// Define the Product schema
const ProductSchema = new Schema<ProductInterface>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: { type: Number, required: [true, 'Product price is required'] },
  category: { type: String, required: [true, 'Product category is required'] },
  tags: { type: [String], required: [true, 'Product tags are required'] },
  variants: {
    type: [VariantsSchema],
    required: [true, 'Product variants are required'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory is required'],
  },
});

// Create the Product model
const ProductModel = model<ProductInterface>('Product', ProductSchema);

export default ProductModel;
