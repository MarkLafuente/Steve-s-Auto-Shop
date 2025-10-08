"use client"

import type React from "react"
import styles from "./OtpContainer.module.css"
import OtpForm from "./OtpForm"
import OtpIllustration from "./OtpIllustration"

interface OtpContainerProps {
  otp: string
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  onOtpChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
  onResend: () => void
}

const OtpContainer: React.FC<OtpContainerProps> = ({
  otp,
  isLoading,
  error,
  isSuccess,
  onOtpChange,
  onSubmit,
  onBack,
  onResend,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.illustrationSection}>
        <OtpIllustration />
      </div>
      <div className={styles.formSection}>
        <OtpForm
          otp={otp}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          onOtpChange={onOtpChange}
          onSubmit={onSubmit}
          onBack={onBack}
          onResend={onResend}
        />
      </div>
      <footer className={styles.footer}>© 2025 IPRIMA & All rights reserved</footer>
    </div>
  )
}

export default OtpContainer