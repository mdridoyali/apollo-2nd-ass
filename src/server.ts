import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import app from './app';
import config from './app/config';
import { ProductRoutes } from './app/modules/product/product.route';

// parser
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

app.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: `Route is not found`,
  });
});

main();
