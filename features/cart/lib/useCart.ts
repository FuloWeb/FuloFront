/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import { Product } from "@/entities";
import { useMessage } from "@/features/message";
import {
  useAddCartItem,
  useCheckoutCart,
  useClearCart,
  useGetCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../api";
import { CartServer, cartStore } from "../model";

export function useCart() {
  const cart = cartStore((state) => state.cart);
  const loading = cartStore((state) => state.loading);
  const setCart = cartStore((state) => state.setCart);
  const setLoading = cartStore((state) => state.setLoading);
  const setError = cartStore((state) => state.setError);

  const { addNewMessage } = useMessage();

  const getCartApi = useGetCart();
  const addItemApi = useAddCartItem();
  const updateItemApi = useUpdateCartItem();
  const removeItemApi = useRemoveCartItem();
  const clearApi = useClearCart();
  const checkoutApi = useCheckoutCart();

  const items = cart?.items ?? [];
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartApi.fetchData();
      if (res) setCart(res as unknown as CartServer);
    } catch {
      setError("Erro ao carregar carrinho.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (product: Product, quantity: number) => {
      if (quantity < 1) return;

      // Otimista
      if (cart) {
        const existing = cart.items.find((i) => i.productId === product.id);
        const optimisticItems = existing
          ? cart.items.map((i) =>
              i.productId === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          : [
              ...cart.items,
              { id: -1, orderId: cart.id, productId: product.id, quantity, product },
            ];
        setCart({ ...cart, items: optimisticItems });
      }

      try {
        await addItemApi.fetchData({ productId: product.id, quantity });
        await fetchCart();
        addNewMessage({ text: "Produto adicionado ao carrinho!" });
      } catch {
        await fetchCart();
        addNewMessage({ text: "Erro ao adicionar produto. Tente novamente." });
      }
    },
    [cart]
  );

  const updateItemQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (cart) {
        setCart({
          ...cart,
          items: cart.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      }
      try {
        await updateItemApi.fetchData({ productId, quantity });
      } catch {
        await fetchCart();
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (productId: number) => {
      if (cart) {
        setCart({
          ...cart,
          items: cart.items.filter((i) => i.productId !== productId),
        });
      }
      try {
        await removeItemApi.fetchData(undefined, { productId });
      } catch {
        await fetchCart();
      }
    },
    [cart]
  );

  const clear = useCallback(async () => {
    try {
      await clearApi.fetchData();
      if (cart) setCart({ ...cart, items: [] });
    } catch {
      addNewMessage({ text: "Erro ao esvaziar o carrinho." });
    }
  }, [cart]);

  /**
   * Finaliza a compra: avança o status do pedido/carrinho atual
   * (POST /cart/checkout) e recarrega o carrinho, que agora
   * virá vazio (o back cria um novo Order AGUARDANDO_PAGAMENTO).
   */
  const checkout = useCallback(async () => {
    if (!cart || cart.items.length === 0) {
      addNewMessage({ text: "Seu carrinho está vazio." });
      return null;
    }

    try {
      const res = await checkoutApi.fetchData();
      await fetchCart();
      addNewMessage({ text: "Pedido realizado com sucesso!" });
      return res?.data ?? null;
    } catch (err: any) {
      const message =
        err?.raw?.response?.data?.error ??
        "Erro ao finalizar o pedido. Tente novamente.";
      addNewMessage({ text: message });
      return null;
    }
  }, [cart]);

  return {
    cart,
    items,
    totalItems,
    totalPrice,
    loading: loading || getCartApi.loading || checkoutApi.loading,
    checkingOut: checkoutApi.loading,
    fetchCart,
    addToCart,
    updateItemQuantity,
    removeItem,
    clear,
    checkout,
  };
}
