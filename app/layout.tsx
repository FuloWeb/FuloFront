"use client"

//@ts-expect-error css import
import "@/config/globals.css";

import { cn } from "@/lib/utils";
import { geistMono, geistSans, inter } from "@/config/meta";
import { Header } from "@/shared";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
