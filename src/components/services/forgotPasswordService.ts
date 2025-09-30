import type { ForgotPasswordFormData } from "../models/ForgotPasswordModel"

export const forgotPasswordService = {
  sendResetPin: async (data: ForgotPasswordFormData): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Sending reset pin to:", data.email)
        resolve()
      }, 1500)
    })
  },
}