import { useEffect } from "react";
import Link from "next/link";
import { ProductCard } from '@/shared/ui';
import { useProduct } from "@/entities/product/lib";

interface SectionProps {
  title: string;
}

export const Section = ({ title }: SectionProps) => {
  const { products, fetchProducts, loading } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className='mx-16 mt-6 mb-16'>
      <hr className='h-0.5 border-[#2c2c2c33]' />
      <h2 className='w-fit mx-auto mt-4.5 font-medium text-2xl'>{title}</h2>

      <section className='mx-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-2 gap-y-4'>
        {loading && (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        )}

        {!loading && products.map((product) => (
          <Link key={product.id} href={`/produto/${product.id}`}>
            <ProductCard
              name={product.name}
              price={product.price}
              category={String(product.categoryId)}
              image={product.photo?.blob}
            />
          </Link>
        ))}
      </section>
    </main>
  );
};