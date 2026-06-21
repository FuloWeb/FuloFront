"use client"

import Link from "next/link";
import { LoginForm } from '@/features/auth/sign-in';

export default function LoginPage() {

  return (
    <div className="mt-20">
      <h2 className='mt-10 text-3xl mx-auto w-fit'>Entre na sua conta</h2>
      <LoginForm />

      <Link
        href="/register"
        className="mx-auto mb-10 block w-fit text-sm underline"
      >
        Não possuo uma conta
      </Link>
    </div>
  );
}
