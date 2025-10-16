"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { otpService } from "../services/otpService"
import { validateOtp } from "../models/OtpModel"
import type { OtpModel } from "../models/OtpModel"

interface UseOtpControllerReturn {
  otp: string
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  setOtp: (value: string) => void
  handleSubmit: () => Promise<void>
  handleBack: () => void
  handleResend: () => Promise<void>
}

export const useOtpController = (email?: string): UseOtpControllerReturn => {
  const [otp, setOtp] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    const validation = validateOtp(otp)
    if (!validation.isValid) {
      setError(validation.errors[0])
      return
    }

    navigate("/change-password")

    try {
      const otpData: OtpModel = { code: otp, email: email }
      otpService.verifyOtp(otpData).catch((err) => {
        console.error("OTP verification failed:", err)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  const handleResend = async () => {
    if (!email) {
      setError("Email address is required to resend OTP")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await otpService.resendOtp(email)
      if (response.success) {
        console.log("OTP resent successfully")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    otp,
    isLoading,
    error,
    isSuccess,
    setOtp: handleOtpChange,
    handleSubmit,
    handleBack,
    handleResend,
  }
}