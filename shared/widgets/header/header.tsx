"use client"

import { useState } from 'react'
import LOGO from '@/public/assets/Logo.svg'
import Image from 'next/image'
import { BurgerMenu, Button, SearchInput } from '@/shared/ui'
import { Icon } from '@iconify/react'
import { Message, useAuth } from '@/features'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const Header = () => {
  
  const router = useRouter()

  const { logout, isAuthenticated, isAdmin } = useAuth()
  const [search, setSearch] = useState("");
  
  const goToLogin = () => router.push("/login")

  // const goToAdmin = () => {
  //   router.replace("/admin");
  // };
  
  const isAdminLoggedIn = isAdmin && isAuthenticated;

  const menu_items = isAdminLoggedIn ? [
    { label: "Dashboard", route: "dashboard" },
    { label: "Produtos", route: "products" },
    { label: "Configurações", route: "settings" }
  ] : [];
  
  const formattedMenuItems = menu_items.map(item => {
    const prefix = isAdminLoggedIn ? 'admin/' : '';
    const fullRoute = `/${prefix}${item.route}`;

    return {
      label: item.label,
      onClick: () => {
        router.push(fullRoute);
      }
    };
  });
  
  return (
    <section className='fixed z-50 w-full'>
      <Message />
      <header
        className='h-20 py-4 px-6 bg-background w-full flex justify-between items-center'
      >
        <div className='flex gap-6 items-center'>
          <BurgerMenu
            items={formattedMenuItems ?? []}
          />
          <Link href='/'>
            <Image
              src={LOGO}
              alt='Maria Fulô logo'
              width={230}
              height={50}
            />
          </Link>
        </div>

        <div className='flex gap-6 items-center'>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(value) => {
              console.log("Pesquisar:", value);
            }}
          />
          <Button onClick={isAuthenticated ? logout : goToLogin}>{isAuthenticated ? "Sair" : "Entrar"}</Button>
          <Icon icon="tabler:shopping-cart" className='text-3xl text-primary-dark'/>
        </div>
      </header>
    </section>
  )
}
