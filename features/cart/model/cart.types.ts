export type CartItem = {
  productId: number;
  name: string;
  price: number;
  color: string;
  quantity: number;
  image?: string;
};

export type CartState = {
  items: CartItem[];
};
