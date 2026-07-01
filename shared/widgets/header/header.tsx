"use client"

import { useState } from 'react'
import LOGO from '@/public/assets/Logo.svg'
import Image from 'next/image'
import { BurgerMenu, Button, SearchInput } from '@/shared/ui'
import { Icon } from '@iconify/react'
import { Message, useAuth } from '@/features'
import { CartSheet, useCart } from '@/features/cart'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const Header = () => {
  const router = useRouter()
  const { logout, isAuthenticated, isAdmin } = useAuth()
  const { totalItems } = useCart()

  const [search, setSearch] = useState("")
  const [cartOpen, setCartOpen] = useState(false)

  const goToLogin = () => router.push("/login")

  const isAdminLoggedIn = isAdmin && isAuthenticated

  const menu_items = isAdminLoggedIn ? [
    { label: "Dashboard", route: "" },
    { label: "Produtos", route: "products" },
    { label: "Configurações", route: "settings" }
  ] : []

  const formattedMenuItems = menu_items.map(item => {
    const prefix = isAdminLoggedIn ? 'admin/' : ''
    const fullRoute = `/${prefix}${item.route}`
    return {
      label: item.label,
      onClick: () => router.push(fullRoute),
    }
  })

  return (
    <section className='fixed z-50 w-full'>
      <Message />
      <header className='h-20 py-4 px-6 bg-background w-full flex justify-between items-center'>
        <div className='flex gap-6 items-center'>
          {isAdmin && (
            <BurgerMenu items={formattedMenuItems ?? []} />
          )}
          <Link href='/'>
            <Image src={LOGO} alt='Maria Fulô logo' width={230} height={50} />
          </Link>
        </div>

        <div className='flex gap-6 items-center'>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(value) => console.log("Pesquisar:", value)}
          />
          <Button onClick={isAuthenticated ? logout : goToLogin}>
            {isAuthenticated ? "Sair" : "Entrar"}
          </Button>

          {/* Ícone do carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrinho"
            className="relative text-primary-dark hover:opacity-75 transition-opacity"
          >
            <Icon icon="tabler:shopping-cart" className="text-3xl" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </section>
  )
}
