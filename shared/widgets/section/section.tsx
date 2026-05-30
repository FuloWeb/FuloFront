import { ProductCard, ProductCardProps } from '@/shared/ui'
import React from 'react'

interface SectionProps {
  title: string
  data: ProductCardProps[]
}

export const Section = ({
  title,
  data
} : SectionProps) => {
  return (
    <main className='mx-16 mt-6 mb-16'>
      <hr className='h-0.5 border-[#2c2c2c33]' />
      <h2 className='w-fit mx-auto mt-4.5 font-medium text-2xl'>{title}</h2>

      <section className='mx-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-2 gap-y-4'>
        {data.map((card, index) => <ProductCard key={index} {...card}/>)}
      </section>
    </main>
  )
}
