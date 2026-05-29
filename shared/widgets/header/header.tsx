import React, { useState } from 'react'
import LOGO from '@/public/assets/Logo.svg'
import Image from 'next/image'
import { Button, SearchInput } from '@/shared/ui'

export const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <header
      className='h-16 p-4 bg-background w-full'
    >
      <Image 
        src={LOGO}
        alt='Maria Fulô logo'
        width={270}
        height={60}
      />

      <Button>Entrar</Button>

      <SearchInput
        value={search}
        onChange={setSearch}
        onSearch={(value) => {
          console.log("Pesquisar:", value);
        }}
      />
    </header>
  )
}
