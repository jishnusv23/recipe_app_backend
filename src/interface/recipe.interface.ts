export interface IWishlist {
  id?: string;
  userId: string;
  productIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
