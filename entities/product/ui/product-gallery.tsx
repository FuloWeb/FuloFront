"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);

  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary-200">
      {hasImages ? (
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative h-full w-full shrink-0">
              <Image
                src={image}
                fill
                alt={`${alt} - imagem ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          Sem imagem disponível
        </div>
      )}

      {hasMultiple && (
        <>
          <button
            onClick={handlePrevious}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50"
          >
            <span className="relative block h-3.5 w-3.5 rotate-180">
              <span className="absolute top-0.75 left-0.5 h-0.5 w-2.5 origin-right rotate-45 bg-white" />
              <span className="absolute bottom-0.75 left-0.5 h-0.5 w-2.5 origin-right -rotate-45 bg-white" />
            </span>
          </button>

          <button
            onClick={handleNext}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute top-0.75 left-0.5 h-0.5 w-2.5 origin-right rotate-45 bg-white" />
              <span className="absolute bottom-0.75 left-0.5 h-0.5 w-2.5 origin-right -rotate-45 bg-white" />
            </span>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Ir para imagem ${index + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  current === index ? "w-8 bg-white" : "w-4 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
