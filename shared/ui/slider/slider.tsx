"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export function ArrowButton({
  direction,
  onClick,
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60"
    >
      <span
        className={`
          relative block h-4 w-4
          ${direction === "left" ? "rotate-180" : ""}
        `}
      >
        <span
          className="
            absolute top-0.75 left-0.5
            h-0.5 w-3
            origin-right
            rotate-45
            bg-white
          "
        />
        <span
          className="
            absolute bottom-0.75 left-0.5
            h-0.5 w-3
            origin-right
            -rotate-45
            bg-white
          "
        />
      </span>
    </button>
  );
}

interface SliderProps {
  images: string[];
}

export function Slider({ images }: SliderProps) {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[70vh] w-full shrink-0"
          >
            {image ? (
              <Image
                src={image}
                fill
                alt={`Slide ${index + 1}`}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border">
                No image Available
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handlePrevious}
        className="
          absolute left-2 md:left-4 lg:left-6
          top-1/2 -translate-y-1/2
          flex items-center justify-center
          h-16 w-8
          md:h-24 md:w-12
          lg:h-40 lg:w-16
          rounded-md
          bg-[#c9c9c933]
          backdrop-blur-sm
          transition-all
          hover:bg-[#c9c9c955]
        "
      >
        <svg
          className="h-10 w-3 md:h-16 md:w-4 lg:h-24 lg:w-5"
          viewBox="0 0 28 140"
          fill="none"
        >
          <path
            d="M22.6989 135.001C16.9116 114.219 8.45292 83.845 5.64425 73.7592C5.294 72.5015 5.11887 71.8726 5.04786 71.2267C4.98481 70.6532 4.98398 70.0746 5.04538 69.501C5.11454 68.8549 5.28776 68.2259 5.63421 66.9678C8.43273 56.8056 16.9047 26.0416 22.6989 5.00122"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="
          absolute right-2 md:right-4 lg:right-6
          top-1/2 -translate-y-1/2
          flex items-center justify-center
          h-16 w-8
          md:h-24 md:w-12
          lg:h-40 lg:w-16
          rounded-md
          bg-[#c9c9c933]
          backdrop-blur-sm
          transition-all
          hover:bg-[#c9c9c955]
        "
      >
        <svg
          className="h-10 w-3 md:h-16 md:w-4 lg:h-24 lg:w-5"
          viewBox="0 0 28 140"
          fill="none"
        >
          <path
            d="M5.00128 5.00122C10.7886 25.783 19.2472 56.1575 22.0559 66.2433C22.4061 67.501 22.5813 68.1298 22.6523 68.7758C22.7153 69.3492 22.7162 69.9278 22.6548 70.5014C22.5856 71.1475 22.4124 71.7766 22.0659 73.0346C19.2674 83.1968 10.7955 113.961 5.00127 135.001"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn("h-1 rounded-full transition-all duration-300", 
              current === index
                ? "w-8 bg-white"
                : "w-4 bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}