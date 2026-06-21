"use client";

import { useForm } from "react-hook-form";
import { IRegisterFormData } from "./../model";
import { useAuth } from "../lib";

export function useRegisterForm() {
  const { register } = useAuth()

  const form = useForm<IRegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const onSubmit = (data: IRegisterFormData) => {
    register(data)
  };

  return {
    form,
    onSubmit,
    register: {
      name: form.register("name", {
        required: "Nome é obrigatório",
      }),
      email: form.register("email", {
        required: "E-mail é obrigatório",
      }),
      password: form.register("password", {
        required: "Senha é obrigatório",
      }),
      address: form.register("address", {
        required: "Endereço é obrigatório",
      }),
    },
  };
}