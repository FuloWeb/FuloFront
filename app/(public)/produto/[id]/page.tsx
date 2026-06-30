"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useProduct } from "@/entities/product/lib";
import { ProductDetails } from "@/shared/widgets/product-details";
import { Section } from "@/shared";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { selected, loading, fetchProductById } = useProduct();

  useEffect(() => {
    fetchProductById(Number(id));
  }, [id]);

  if (!selected) {
    return (
      <div className="mx-16 mt-20 text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <div className="mt-20">
      <ProductDetails product={selected} />
      <Section title="Sugestões" />
    </div>
  );
}
