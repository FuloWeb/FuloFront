"use client";

import { Input } from "../input/input";
import { cn } from "@/lib/utils";
import { KeyboardEvent, useState } from "react";
import { Icon } from "@iconify/react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Pesquisar...",
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch?.(value);
    }
  };

  return (
    <fieldset
      className={cn(
        "flex items-center justify-between rounded-[66px] h-11 border-2 border-secondary-200 bg-secondary-100 pr-0.5 pl-3 py-1 w-fit",
        {
          "bg-transparent border-0": !isOpen
        }
      )}
    >
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "sm:w-96 2xl:w-2xl opacity-100" : "w-0 opacity-0"
        )}
      >
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "cursor-pointer rounded-sm text-primary-dark",
          {
            "rounded-full bg-primary-dark p-2 text-secondary-100": isOpen
          }
        )}
      >
        <Icon icon="tabler:search" className={cn("text-inherit text-lg", { "text-2xl": !isOpen})} />
      </button>
    </fieldset>
  );
}