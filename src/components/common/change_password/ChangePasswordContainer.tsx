"use client"

import type React from "react"
import styles from "./ChangePasswordContainer.module.css"
import ChangePasswordForm from "./ChangePasswordForm"
import OtpIllustration from "../OTP/OtpIllustration"

interface ChangePasswordContainerProps {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  onCurrentPasswordChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
}

const ChangePasswordContainer: React.FC<ChangePasswordContainerProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isLoading,
  error,
  isSuccess,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.illustrationSection}>
        <OtpIllustration />
      </div>
      <div className={styles.formSection}>
        <ChangePasswordForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          onCurrentPasswordChange={onCurrentPasswordChange}
          onNewPasswordChange={onNewPasswordChange}
          onConfirmPasswordChange={onConfirmPasswordChange}
          onSubmit={onSubmit}
          onBack={onBack}
        />
      </div>
      <footer className={styles.footer}>© 2025 IPRIMA | All rights reserved</footer>
    </div>
  )
}

export default ChangePasswordContainer