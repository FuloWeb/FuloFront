"use client";

import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  className,
}: QuantityStepperProps) {
  const canDecrease = value > min;
  const canIncrease = max === undefined || value < max;

  const decrease = () => {
    if (canDecrease) onChange(value - 1);
  };

  const increase = () => {
    if (canIncrease) onChange(value + 1);
  };

  const handleChange = (raw: string) => {
    if (raw === "") return;

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;

    const clamped = Math.min(max ?? parsed, Math.max(min, parsed));
    onChange(clamped);
  };

  return (
    <div
      data-slot="quantity-stepper"
      className={cn(
        "flex w-fit items-center rounded-md border border-input",
        className
      )}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={!canDecrease}
        aria-label="Diminuir quantidade"
        className="flex h-9 w-9 items-center justify-center text-lg text-foreground transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
      >
        −
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="h-9 w-12 border-x border-input bg-transparent text-center text-sm outline-none"
      />

      <button
        type="button"
        onClick={increase}
        disabled={!canIncrease}
        aria-label="Aumentar quantidade"
        className="flex h-9 w-9 items-center justify-center text-lg text-foreground transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
      >
        +
      </button>
    </div>
  );
}
