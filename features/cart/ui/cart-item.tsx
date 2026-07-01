"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/shared/ui";
import { useCart } from "../lib";
import { CartItemServer } from "../model";

type Props = {
  item: CartItemServer;
};

export function CartItem({ item }: Props) {
  const { updateItemQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const formattedPrice = (product.price * quantity).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      {/* Imagem */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary-200">
        {product.photo?.blob ? (
          <Image
            src={product.photo.blob as unknown as string}
            fill
            alt={product.name}
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-secondary-200" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-foreground leading-tight">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.color}
            </p>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            aria-label="Remover item"
            className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <QuantityStepper
            value={quantity}
            onChange={(val) => updateItemQuantity(product.id, val)}
            min={1}
            max={product.quantity}
            className="h-7 text-xs"
          />
          <span className="text-sm font-semibold text-primary-dark">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
