// Service: Handle API calls and business logic for password change

import type { ChangePasswordData, ChangePasswordResponse } from "../models/ChangePasswordModel"

export class ChangePasswordService {
  private apiUrl: string

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
  }

  async changePassword(data: ChangePasswordData): Promise<ChangePasswordResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to change password")
      }

      const result = await response.json()
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  async verifyCurrentPassword(password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/auth/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.valid
    } catch (error) {
      return false
    }
  }
}

export const changePasswordService = new ChangePasswordService()
