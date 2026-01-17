export type AddProductFormData = {
  name: string;
  key: string;
  price: number;
  category: string;
  description: string;
  image: File | null;
};

export type LatestOrder = {
  playerNick: string;
  productName: string;
  productImage: string;
  purchasedAt: Date;
};
