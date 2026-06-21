"use client";

import { User, userStore } from "../model";
import {
  useGetUsers,
  useGetUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../api";

export function useUser() {
  const store = userStore();

  const getUsersApi = useGetUsers();
  const getUserApi = useGetUser();
  const createUserApi = useCreateUser();
  const updateUserApi = useUpdateUser();
  const deleteUserApi = useDeleteUser();

  const fetchUsers = async () => {
    store.setLoading(true);
    try {
      const res = await getUsersApi.fetchData();
      store.setUsers(res.data);
    } finally {
      store.setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    const res = await getUserApi.fetchData(undefined, { id });
    store.selectUser(res.data);
    return res.data;
  };

  const addUser = async (data: Partial<User>) => {
    const res = await createUserApi.fetchData(data);
    store.addUser(res.data);
    return res.data;
  };

  const updateUser = async ({ id, ...rest }: User) => {
    const res = await updateUserApi.fetchData(rest, { id });
    store.updateUser(res.data);
    return res.data;
  };

  const deleteUser = async (id: string) => {
    await deleteUserApi.fetchData(undefined, { id });
    store.deleteUser(id);
  };

  return {
    ...store,
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser,
  };
}