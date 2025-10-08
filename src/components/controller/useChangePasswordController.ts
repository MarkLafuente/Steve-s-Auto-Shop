

"use client"

import { useState } from "react"
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

    setIsLoading(true)

    try {
      const response = await changePasswordService.changePassword(data)

      if (response.success) {
        setIsSuccess(true)
        
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        
        setTimeout(() => {
          
          console.log("Password changed successfully")
        }, 2000)
      } else {
        setError(response.message || "Failed to change password")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    
    console.log("Navigate back")
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
