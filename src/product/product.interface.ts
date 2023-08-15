export interface IProduct {
  id: string; // Unique identifier for the product
  productName: string; // Name of the product
  productDescription: string; // Description of the product
  price: number; // Price of the product
  category: string; // Category of the product
  stockQuantity: number; // Quantity of the product in stock
  createdAt: Date; // Timestamp when the product was created
  updatedAt: Date; // Timestamp when the product was last updated
}
