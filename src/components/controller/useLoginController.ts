"use client"

import type React from "react"

import { useState } from "react"
import type { LoginModel } from "../models/LoginModel"
import { loginUser } from "../services/authService"

const useLoginController = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const loginData: LoginModel = {
      email,
      password,
    }

    setIsLoading(true)

    try {
      const result = await loginUser(loginData)
      console.log("[v0] Login successful:", result)
      // Handle successful login (e.g., redirect, store token)
    } catch (error) {
      console.error("[v0] Login failed:", error)
      // Handle login error (e.g., show error message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    isLoading,
  }
}

export default useLoginController
