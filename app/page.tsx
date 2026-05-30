"use client"

import { useAuth } from "@/features";
import { Section, Slider } from "@/shared";
import { useRouter } from "next/navigation";

export const products = [
  {
    id: 1,
    name: "Colar Aurora",
    price: 89.9,
    category: "Colares",
    image: "",
  },
  {
    id: 2,
    name: "Pulseira Gold",
    price: 59.9,
    category: "Pulseiras",
    image: "",
  },
  {
    id: 3,
    name: "Brinco Pérola",
    price: 39.9,
    category: "Brincos",
    image: "",
  },
  {
    id: 4,
    name: "Anel Elegance",
    price: 49.9,
    category: "Anéis",
    image: "",
  },
  {
    id: 5,
    name: "Colar Lua",
    price: 79.9,
    category: "Colares",
    image: "",
  },
  {
    id: 6,
    name: "Pulseira Crystal",
    price: 69.9,
    category: "Pulseiras",
    image: "",
  },
  {
    id: 7,
    name: "Brinco Floral",
    price: 34.9,
    category: "Brincos",
    image: "",
  },
  {
    id: 8,
    name: "Anel Infinity",
    price: 54.9,
    category: "Anéis",
    image: "",
  },
  {
    id: 9,
    name: "Colar Estelar",
    price: 94.9,
    category: "Colares",
    image: "",
  },
  {
    id: 10,
    name: "Pulseira Charm",
    price: 44.9,
    category: "Pulseiras",
    image: "",
  },
  {
    id: 11,
    name: "Brinco Aurora",
    price: 42.9,
    category: "Brincos",
    image: "",
  },
  {
    id: 12,
    name: "Anel Royal",
    price: 74.9,
    category: "Anéis",
    image: "",
  },
  {
    id: 13,
    name: "Colar Harmonia",
    price: 84.9,
    category: "Colares",
    image: "",
  },
  {
    id: 14,
    name: "Pulseira Shine",
    price: 52.9,
    category: "Pulseiras",
    image: "",
  },
  {
    id: 15,
    name: "Brinco Safira",
    price: 64.9,
    category: "Brincos",
    image: "",
  },
  {
    id: 16,
    name: "Anel Dourado",
    price: 57.9,
    category: "Anéis",
    image: "",
  },
  {
    id: 17,
    name: "Colar Pérola",
    price: 99.9,
    category: "Colares",
    image: "",
  },
  {
    id: 18,
    name: "Pulseira Lux",
    price: 72.9,
    category: "Pulseiras",
    image: "",
  },
  {
    id: 19,
    name: "Brinco Estrela",
    price: 38.9,
    category: "Brincos",
    image: "",
  },
  {
    id: 20,
    name: "Anel Crystal",
    price: 68.9,
    category: "Anéis",
    image: "",
  },
];

export default function HomePage() {

  const router = useRouter()
  const { isAdmin, isAuthenticated } = useAuth()
  
  const goToLogin = () => router.push("/login")

  const goToAdmin = () => {
    router.replace("/admin");
  };

  const isAdminLoggedIn = isAdmin && isAuthenticated;

  return (
    <div className="mt-20">
      <Slider
        images={[
          "/assets/Image01.png",
          "/assets/Image02.png",
          "/assets/Image03.png",
        ]}
      />

      <Section 
        title="Destaques"
        data={products}
      />
    </div>
  );
}
{/* {!isAuthenticated && <button onClick={goToLogin}>Go LOGIN</button>}

{isAdminLoggedIn && <button onClick={goToAdmin}>Go ADMIN</button>} */}
