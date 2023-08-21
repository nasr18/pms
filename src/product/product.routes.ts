import express, { Request, Response } from 'express';

import * as productModel from './product.model';
import findDuplicateProducts from './product.middleware';

export const productRouter = express.Router();

productRouter.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const filter = { productName: req.query.productName as string }
      const products = await productModel.findAll(filter);

      if (!products.length)
        return res.status(404).json({ msg: 'No products found!', data: [] });

      return res.status(200).json({ msg: 'Products retrieved successfully!', data: products });
    } catch (err: any) {
      console.error('error while fetching the products:', { err });
      return res.status(500).json({ msg: err.message });
    }
  })
  .post(findDuplicateProducts, async (req: Request, res: Response) => {
    console.log('post', req.body);
    try {
      const product = await productModel.create(req.body);

      return res.status(200).json({ msg: 'Product added successfully!', data: product });
    } catch (err: any) {
      console.error('error while adding the product:', { err });
      return res.status(500).json({ msg: err.message });
    }
  });

productRouter.route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const product = await productModel.findOne({ productId: req.params.id });

      if (!product)
        return res.status(404).json({ msg: 'No product found!', data: product });

      return res.status(200).json({ msg: 'Product retrieved successfully!', data: product });
    } catch (err: any) {
      console.error('error while fetching the product:', { err });
      return res.status(500).json({ msg: err.message });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const product = await productModel.update(req.params.id, req.body);

      return res.status(200).json({ msg: 'Product updated successfully!', data: product });
    } catch (err: any) {
      console.error('error while updating the product:', { err });
      return res.status(500).json({ msg: err.message });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const product = await productModel.remove(req.params.id);

      return res.status(200).json({ msg: 'Product deleted successfully!', data: product });
    } catch (err: any) {
      console.error('error while deleting the product:', { err });
      return res.status(500).json({ msg: err.message });
    }
  });
