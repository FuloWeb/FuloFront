export type User = {
  // TODO: TROCAR ROLE POR ENUM
  role: number,
  email: string,
  address: string,
  name: string,
}

export type UserRegisterAuth = Pick<
  User,
  "name" | "address" | "email"
> & { password: string }

export type UserAuth = Pick<
  User, "email"
> & { password: string }
