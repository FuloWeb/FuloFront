"use client"

import { useAuth } from "@/features";
import { Slider } from "@/shared";
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
      <Slider
        images={[
          "/assets/Image01.png",
          "/assets/Image02.png",
          "/assets/Image03.png",
        ]}
      />
      {!isAuthenticated && <button onClick={goToLogin}>Go LOGIN</button>}
      
      {isAdminLoggedIn && <button onClick={goToAdmin}>Go ADMIN</button>}
    </div>
  );
}
