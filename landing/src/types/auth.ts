export type RegisterType = {
  email: string
  password: string
  confirmPassword: string
  name: string
}
export type LoginType = {
  email: string
  password: string
}
export type AuthType = { accessToken: string; refreshToken: string }

export type UserType = {
  active: boolean
  createdAt: string
  emailAddress: string
  id: string
  role: string
  updatedAt: string
}

export type LoginResType = { auth: AuthType; admin: UserType }
