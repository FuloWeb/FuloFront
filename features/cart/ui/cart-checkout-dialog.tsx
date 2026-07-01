"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Button,
} from "@/shared/ui";
import { useCart } from "../lib";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
};

export function CartCheckoutDialog({ open, onOpenChange, onConfirm, loading }: Props) {
  const { items, totalPrice } = useCart();

  const formattedTotal = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar pedido</DialogTitle>
        </DialogHeader>

        {/* Resumo */}
        <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-foreground"
            >
              <span className="text-muted-foreground">
                {item.product.name}{" "}
                <span className="text-xs">x{item.quantity}</span>
              </span>
              <span className="font-medium">
                {(item.product.price * item.quantity).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold text-foreground">
          <span>Total</span>
          <span className="text-primary-dark text-base">{formattedTotal}</span>
        </div>

        <DialogFooter className="mt-2 flex-row gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button className="flex-1" disabled={loading}>
              Voltar
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} className="flex-1" disabled={loading}>
            {loading ? "Processando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
