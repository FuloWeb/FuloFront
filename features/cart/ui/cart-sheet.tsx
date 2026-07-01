"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Button,
} from "@/shared/ui";
import { useCart } from "../lib";
import { CartItem } from "./cart-item";
import { CartCheckoutDialog } from "./cart-checkout-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: Props) {
  const { items, totalPrice, loading, checkingOut, fetchCart, checkout } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (open) fetchCart();
  }, [open]);

  const formattedTotal = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleConfirm = async () => {
    const order = await checkout();
    setConfirmOpen(false);
    if (order) onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Meu carrinho</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4">
            {loading && (
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Carregando...
              </p>
            )}

            {!loading && items.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                <span className="text-5xl">🛒</span>
                <p className="text-sm">Seu carrinho está vazio.</p>
              </div>
            )}

            {!loading &&
              items.map((item) => <CartItem key={item.id} item={item} />)}
          </div>

          {items.length > 0 && (
            <SheetFooter className="border-t border-border pt-4 flex-col gap-3">
              <div className="flex justify-between text-sm font-semibold text-foreground w-full">
                <span>Total</span>
                <span className="text-primary-dark text-base">
                  {formattedTotal}
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => setConfirmOpen(true)}
                disabled={loading}
              >
                Finalizar pedido
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <CartCheckoutDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirm}
        loading={checkingOut}
      />
    </>
  );
}
