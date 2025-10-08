declare const process: any



import type { OtpModel, OtpResponse, OtpError } from "../models/OtpModel"

class OtpService {
  private apiUrl: string

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

  }

  
  async verifyOtp(otpData: OtpModel): Promise<OtpResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      })

      if (!response.ok) {
        const error: OtpError = await response.json()
        throw new Error(error.message || "Failed to verify OTP")
      }

      const data: OtpResponse = await response.json()
      return data
    } catch (error) {
      console.error("OTP verification error:", error)
      throw error
    }
  }

  
  async resendOtp(email: string): Promise<OtpResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/otp/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const error: OtpError = await response.json()
        throw new Error(error.message || "Failed to resend OTP")
      }

      const data: OtpResponse = await response.json()
      return data
    } catch (error) {
      console.error("OTP resend error:", error)
      throw error
    }
  }
}


export const otpService = new OtpService()