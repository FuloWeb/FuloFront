"use client";

import { useForm } from "react-hook-form";
import { ILoginFormData } from "./../model";
import { useAuth } from "../lib";

export function useLoginForm() {
  const { login } = useAuth()

  const form = useForm<ILoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginFormData) => {
    login(data)
  };

  return {
    form,
    onSubmit,
    login: {
      email: form.register("email", {
        required: "E-mail é obrigatório",
      }),
      password: form.register("password", {
        required: "Senha é obrigatório",
      }),
    },
  };
}