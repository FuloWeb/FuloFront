"use client";

import { useState } from "react";

import { Product } from "@/entities";
import {
  Button,
  Field,
  FieldContent,
  FieldLabel,
  QuantityStepper,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useCart } from "../lib";
import { ShippingField } from "./shipping-field";

type Props = {
  product: Product;
  colors?: string[];
};

export function ProductPurchasePanel({ product, colors }: Props) {
  const availableColors = colors?.length ? colors : [product.color];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, loading } = useCart();

  const inStock = product.quantity > 0;

  const handleBuy = async () => {
    if (!inStock) return;
    await addToCart(product, quantity);
  };

  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel>Cor</FieldLabel>
        <FieldContent>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma cor" />
            </SelectTrigger>
            <SelectContent>
              {availableColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <div className="flex items-end gap-3">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={product.quantity}
        />
        <Button
          type="button"
          onClick={handleBuy}
          disabled={!inStock || loading}
          className="flex-1"
        >
          {loading ? "Adicionando..." : inStock ? "Comprar" : "Indisponível"}
        </Button>
      </div>

      <ShippingField />
    </div>
  );
}
