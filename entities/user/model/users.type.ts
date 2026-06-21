export type User = {
  password?: string
  id: string
  role: UserRole,
  email: string,
  address: string,
  name: string,
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export type UserRegisterAuth = Pick<
  User,
  "name" | "address" | "email"
> & { password: string }

export type UserAuth = Pick<
  User, "email"
> & { password: string }
