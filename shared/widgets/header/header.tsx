"use client"

import { useState } from 'react'
import LOGO from '@/public/assets/Logo.svg'
import Image from 'next/image'
import { BurgerMenu, Button, SearchInput } from '@/shared/ui'
import { Icon } from '@iconify/react'

export const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <header
      className='h-24 py-4 px-6 bg-background w-full flex justify-between items-center'
    >
      <div className='flex gap-6 items-center'>
        <BurgerMenu
          items={[
            {
              label: "Dashboard",
              onClick: () => console.log("dashboard"),
            },
            {
              label: "Usuários",
              onClick: () => console.log("users"),
            },
            {
              label: "Configurações",
              onClick: () => console.log("settings"),
            },
          ]}
        />
        <Image
          src={LOGO}
          alt='Maria Fulô logo'
          width={230}
          height={50}
        />
      </div>

      <div className='flex gap-6 items-center'>
        <SearchInput
          value={search}
          onChange={setSearch}
          onSearch={(value) => {
            console.log("Pesquisar:", value);
          }}
        />
        <Button>Entrar</Button>
        <Icon icon="tabler:shopping-cart" className='text-3xl text-primary-dark'/>
      </div>
    </header>
  )
}
