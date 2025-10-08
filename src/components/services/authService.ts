import type { LoginModel, LoginResponse } from "../models/LoginModel"

export const loginUser = async (loginData: LoginModel): Promise<LoginResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: loginData.email,
          role: "teacher",
        },
      })
    }, 1000)
  })
}