"use client"

import { useAuth } from "@/features";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter()
  const { isAdmin, isAuthenticated } = useAuth()
  
  const goToLogin = () => router.push("/login")

  const goToAdmin = () => {
    router.replace("/admin");
  };

  const isAdminLoggedIn = isAdmin && isAuthenticated;

  return (
    <div>
      HOME
      {!isAuthenticated && <button onClick={goToLogin}>Go LOGIN</button>}
      
      {isAdminLoggedIn && <button onClick={goToAdmin}>Go ADMIN</button>}
    </div>
  );
}
