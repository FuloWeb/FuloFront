import { Product } from "@/entities";

// Formato do item retornado pelo backend (OrderItem + product)
export type CartItemServer = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: Product;
};

// Formato do carrinho retornado pelo backend (Order com items)
export type CartServer = {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  items: CartItemServer[];
};

// Body para POST /cart/items e PATCH /cart/items
export type CartAddItemBody = {
  productId: number;
  quantity: number;
};

export type CartUpdateItemBody = {
  productId: number;
  quantity: number;
};
