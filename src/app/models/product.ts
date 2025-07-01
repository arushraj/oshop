export interface IProduct {
  id?: string; // Optional for new products
  name: string;
  price: number;
  category: string; // Category Name
  imageUrl: string;
  description?: string; // Optional field
  // stock?: number; // Optional field for stock quantity
  // rating?: number; // Optional field for product rating
  // createdAt?: Date; // Optional field for creation date
  // updatedAt?: Date; // Optional field for last update date
  // isActive?: boolean; // Optional field to indicate if the product is active
}
