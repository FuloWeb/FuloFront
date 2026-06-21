"use client"

import { Footer, Header } from "@/shared";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
