export type User = {
  // TODO: TROCAR ROLE POR ENUM
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
