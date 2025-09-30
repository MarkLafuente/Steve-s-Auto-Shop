export interface LoginModel {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    email: string
    role: "student" | "teacher"
  }
  message?: string
}