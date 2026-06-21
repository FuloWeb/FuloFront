'use client'

import { Icon } from "@iconify/react"
import { useMessage } from "../lib"
import { cn } from "@/lib/utils"

export const Message = () => {
  const { content, clearMessage } = useMessage()

  return (
    <article 
      className={cn(
        "flex h-6 w-full items-center justify-center bg-primary-dark px-2.5 py-2 text-xs text-white relative transition-all duration-200",
        {"h-0 py-0 overflow-hidden": !content?.text}
      )}
    >
      {content?.text}

      <Icon 
        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" 
        icon="tabler:x" 
        onClick={() => clearMessage()}
      />
    </article>
  )
}