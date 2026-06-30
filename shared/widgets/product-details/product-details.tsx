"use client";

import Link from "next/link";

import { Product } from "@/entities";
import { ProductGallery } from "@/entities/product/ui";
import { ProductPurchasePanel } from "@/features/cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared";

type Props = {
  product: Product;
};

export function ProductDetails({ product }: Props) {
  const images = product.photo?.blob ? [product.photo.blob] : [];

  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="mx-16 mt-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/produtos">Produtos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={images} alt={product.name} />

        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {product.name}
          </h1>

          <p className="mt-1 text-lg font-medium text-foreground">
            {formattedPrice}
          </p>

          <div className="mt-6">
            <ProductPurchasePanel product={product} />
          </div>

          {product.description && (
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <h2 className="text-base font-medium text-foreground">
                Descrição
              </h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
