"use client"

import { useAuth } from '@/features'

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  return (
    <div>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
