import { NextFunction, Request, Response } from "express";

import { IProduct } from "./product.interface";

export default function findDuplicateProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const products: IProduct[] = req.body;

  let currentProductName = "";
  let isDuplicateProductExists = false;
  const duplicateProducts: any = {};

  for (let i = 0; i < products.length; i++) {
    isDuplicateProductExists = false;
    currentProductName = products[i].productName;

    const product = products.find(
      (_product, _index) =>
        i !== _index && _product.productName === currentProductName
    );

    if (product) {
      isDuplicateProductExists = true;
      duplicateProducts[currentProductName] =
        duplicateProducts[currentProductName] ?? {};

      duplicateProducts[currentProductName].positions =
        duplicateProducts[currentProductName] &&
        duplicateProducts[currentProductName].positions
          ? duplicateProducts[currentProductName].positions + ", " + (i + 1)
          : i + 1;
    }
  }

  if (isDuplicateProductExists) {
    const result = Object.entries(duplicateProducts).map(
      (duplicateProduct: any) => {
        return {
          msg: `The product [${duplicateProduct[0]}] already exists at the positions ${duplicateProduct[1].positions}`,
        };
      }
    );
    return res.status(400).json(result);
  }

  next();
}
