"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

interface BurgerMenuProps {
  items: MenuItem[];
}

export function BurgerMenu({ items }: BurgerMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Menu"
          className="group flex items-center justify-center rounded-md transition-colors cursor-pointer"
        >
          <div className="relative h-5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 block h-0.75 w-5 bg-primary-dark transition-all duration-300",
                open && "top-2 rotate-45"
              )}
            />

            <span
              className={cn(
                "absolute left-0 top-2 block h-0.75 w-5 bg-primary-dark transition-all duration-300",
                open && "opacity-0"
              )}
            />

            <span
              className={cn(
                "absolute left-0 top-4 block h-0.75 w-5 bg-primary-dark transition-all duration-300",
                open && "top-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-w-56 p-0"
      >
        <div className="flex flex-col">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary-100 border-b"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}