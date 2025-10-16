"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ChangePasswordData } from "../models/ChangePasswordModel"
import { ChangePasswordValidator } from "../models/ChangePasswordModel"
import { changePasswordService } from "../services/changePasswordService"

export const useChangePasswordController = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError(null)
    setIsSuccess(false)

    const data: ChangePasswordData = {
      currentPassword,
      newPassword,
      confirmPassword,
    }

    const validationError = ChangePasswordValidator.validateAll(data)
    if (validationError) {
      setError(validationError.message)
      return
    }

    navigate("/password-success")

    try {
      changePasswordService.changePassword(data).catch((err) => {
        console.error("Password change failed:", err)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    isLoading,
    error,
    isSuccess,
    handleSubmit,
    handleBack,
  }
}