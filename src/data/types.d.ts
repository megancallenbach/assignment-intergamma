export type Product = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  price: number;
  reviews: {
    average: number;
    totalCount: number;
  };
};

export type WishlistItem = {
  id?: string;
  productId: string;
  count: number;
};
