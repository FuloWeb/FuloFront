import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer px-6 py-2 h-11 rounded-[46px] text-lg bg-transparent text-primary-dark border-2 border-primary-dark flex justify-center items-center hover:text-secondary-100 hover:bg-primary-dark duration-100 capitalize active:bg-secondary-200 active:border-secondary-500 active:text-secondary-500 focus:text-secondary-100 focus:bg-primary-dark font-medium",
  {
    variants: {
      size: {
        default:"",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type PropsButton =  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export type SizeButtonOptionsType = PropsButton['size']

function Button({
  className,
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & PropsButton) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-size={size}
      className={cn(buttonVariants({ size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
