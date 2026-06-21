import Image from "next/image";
import { Card, CardContent } from "../card/card";

export interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image?: string;
}

export function ProductCard({
  name,
  price,
  category,
  image,
}: ProductCardProps) {
  return (
    <Card className="ring-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <div className="relative aspect-4/6 max-w-64 overflow-hidden rounded-lg bg-secondary-200">
          {image && (
            <Image
              src={image}
              fill
              alt={name}
            />
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="text-[16px] font-semibold leading-none text-foreground">
            {name}
          </h3>

          <p className="text-[28px] font-medium leading-none text-foreground">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p className="text-sm text-foreground font-semibold">
            {category}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}