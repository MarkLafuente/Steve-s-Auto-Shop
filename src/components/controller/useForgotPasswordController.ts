"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useForgotPasswordController = () => {
  const navigate = useNavigate()

  const [state, setState] = useState({
    email: "",
    isLoading: false,
    error: null,
    success: false,
  })

  const handleEmailChange = (email: string) => {
    setState((prev) => ({ ...prev, email }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/otp-view")
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