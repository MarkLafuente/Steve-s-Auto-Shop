"use client"



import type React from "react"
import { useChangePasswordController } from "../controller/useChangePasswordController"
import ChangePasswordContainer from "../common/change_password/ChangePasswordContainer"

const ChangePasswordView: React.FC = () => {
  const controller = useChangePasswordController()

  return (
    <ChangePasswordContainer
      currentPassword={controller.currentPassword}
      newPassword={controller.newPassword}
      confirmPassword={controller.confirmPassword}
      isLoading={controller.isLoading}
      error={controller.error}
      isSuccess={controller.isSuccess}
      onCurrentPasswordChange={controller.setCurrentPassword}
      onNewPasswordChange={controller.setNewPassword}
      onConfirmPasswordChange={controller.setConfirmPassword}
      onSubmit={controller.handleSubmit}
      onBack={controller.handleBack}
    />
  )
}

export default ChangePasswordView
