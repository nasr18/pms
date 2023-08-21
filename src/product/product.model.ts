import { IProduct } from './product.interface';

const products: IProduct[] = [];

export const findAll = async (filter?: { productName: string }): Promise<IProduct[]> => {
  console.log('findAll', { filter });
  if (filter?.productName) return products.filter((product) => product.productName.includes(filter.productName));
  return products;
}

export const findOne = async ({ productId }: { productId: string }): Promise<IProduct | undefined> => {
  console.log('findOne', { productId });
  return products.find((product) => productId === product.id);
}

export const create = async (product: IProduct): Promise<IProduct | null> => {
  if (products.findIndex(_product => _product.id === product.id) > -1)
    throw new Error('Product already exists');
  console.log('create', { product });

  products.push(product);
  return product;
}

export const bulkCreate = async (products: IProduct[]): Promise<IProduct[] | null> => {
  // if (products.findIndex(_product => _product.id === product.id) > -1)
  //   throw new Error('Product already exists');
  // console.log('create', { product });

  products.push(...products);
  return products;
}

export const update = async (id: string, product: IProduct): Promise<IProduct | null> => {
  console.log('update', { product });
  const { id: productId, ...updatedProduct } = product;
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) throw new Error('Product doesn\'t exist');

  products[productIndex] = {
    id,
    ...updatedProduct,
  };
  return product;
}

export const remove = async (id: string): Promise<null | void> => {
  console.log('remove', { id });
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) throw new Error('Product doesn\'t exist');

  products.splice(productIndex, 1);
}
