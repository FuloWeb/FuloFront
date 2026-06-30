"use client";

import { useState } from "react";
import { Product } from "@/entities";
import { useMessage } from "@/features/message";
import { cartStore } from "../model";

export function useCart() {
  const items = cartStore((state) => state.items);
  const addItem = cartStore((state) => state.addItem);
  const removeItem = cartStore((state) => state.removeItem);
  const updateItemQuantity = cartStore((state) => state.updateItemQuantity);
  const clear = cartStore((state) => state.clear);

  const { addNewMessage } = useMessage();

  const [checkingOut, setCheckingOut] = useState(false);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product: Product, quantity: number, color: string) => {
    if (quantity < 1) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color,
      quantity,
      image: product.photo?.blob,
    });

    addNewMessage({ text: "Produto adicionado ao carrinho!" });
  };

  /**
   * MOCK — checkout do carrinho.
   *
   * Hoje chama a rota fake `app/api/cart/checkout/route.ts`.
   *
   * Para trocar pelo backend real (POST /orders), troque o `fetch` abaixo por:
   * ```ts
   * const createOrder = useCreateOrder(); // createEndpointHook(endpointsMap.orders.createOrder)
   * const res = await createOrder.fetchData({ items: ... });
   * ```
   * e remova a pasta `app/api/cart`.
   */
  const checkout = async () => {
    if (items.length === 0) return null;

    setCheckingOut(true);

    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao finalizar pedido");
      }

      const { data } = await response.json();

      clear();
      addNewMessage({ text: "Pedido realizado com sucesso!" });

      return data;
    } catch {
      addNewMessage({ text: "Erro ao finalizar o pedido. Tente novamente." });
      return null;
    } finally {
      setCheckingOut(false);
    }
  };

  return {
    items,
    totalItems,
    totalPrice,
    checkingOut,
    addToCart,
    checkout,
    removeItem,
    updateItemQuantity,
    clear,
  };
}
