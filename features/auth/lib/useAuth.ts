'use client'

import { UserAuth, UserRegisterAuth } from "@/entities";
import { authStore } from "../model";
import { useRouter } from "next/navigation";
import { usePostRegister, usePostLogin, usePostLogout } from "../api";
import { useMessage } from "@/features/message";

export function useAuth() {
  const router = useRouter();
  const user = authStore((state) => state.user);
  const loading = authStore((state) => state.loading);
  const auth = authStore((state) => state.auth);

  const doRegister = usePostRegister()
  const doLogin = usePostLogin()
  const doLogout = usePostLogout()

  const { addNewMessage } = useMessage()

  const register = async (data: UserRegisterAuth) => {
    const response = await doRegister.fetchData(data)
    if(response?.success) {
      addNewMessage({ text: "Usuário cadastrado com sucesso!" })
      router.replace("/login")

    } else {
      addNewMessage({ text: "Erro ao cadastrar usuário!" })
    }
  }

  const login = async (userData: UserAuth) => {
    try {
      const response = await doLogin.fetchData(userData);

      auth.initSession(response.data);

      console.log(response);
      
      if(response.success) {
        addNewMessage({ text: "Seja bem vindo!" })
        router.replace("/");

      } else {
        addNewMessage({ text: "Erro autenticar usuário!" })
      }
    } catch {
      addNewMessage({ text: "Erro autenticar usuário!" })
      auth.finishAuthCheck();
    }
  };

  const logout = async () => {
    await doLogout.fetchData()
    auth.endSession();
  };

  // const isAdmin = user?.admin

  return {
    user,
    loading,
    // isAdmin,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };
}