import { RegisterForm } from "@/features";
import Link from "next/link";

export default function RegisterPage() {

  return (
    <div className="mt-20">
      <h2 className='mt-10 text-3xl mx-auto w-fit'>Entre na sua conta</h2>
      <RegisterForm />

      <Link
        href="/login"
        className="mx-auto mb-10 block w-fit text-sm underline"
      >
        Já possuo uma conta
      </Link>
    </div>
  );
}