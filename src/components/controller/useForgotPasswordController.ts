"use client"

import type React from "react"

import { useState } from "react"
import type { ForgotPasswordState, ForgotPasswordFormData } from "../models/ForgotPasswordModel"
import { forgotPasswordService } from "../services/forgotPasswordService"

export const useForgotPasswordController = () => {
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    isLoading: false,
    error: null,
    success: false,
  })

  const handleEmailChange = (email: string) => {
    setState((prev) => ({ ...prev, email, error: null }))
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(state.email)) {
      setState((prev) => ({ ...prev, error: "Please enter a valid email address" }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const formData: ForgotPasswordFormData = { email: state.email }
      await forgotPasswordService.sendResetPin(formData)
      setState((prev) => ({ ...prev, isLoading: false, success: true }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to send reset pin. Please try again.",
      }))
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  return {
    state,
    handleEmailChange,
    handleSubmit,
    handleBack,
  }
}
