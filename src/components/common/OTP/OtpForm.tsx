"use client"

import type React from "react"
import styles from "./OtpForm.module.css"

interface OtpFormProps {
  otp: string
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  onOtpChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
  onResend: () => void
}

const OtpForm: React.FC<OtpFormProps> = ({
  otp,
  isLoading,
  error,
  isSuccess,
  onOtpChange,
  onSubmit,
  onBack,
  onResend,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      onSubmit()
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>One-Time Pin</h1>
      <p className={styles.subtitle}>Check your IPRIMA Education email for One-Time Pin</p>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Enter OTP</label>
        <div className={styles.inputWrapper}>
          <div className={styles.gridIcon}>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
            <div className={styles.gridDot}></div>
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => onOtpChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.otpInput}
            placeholder=""
            disabled={isLoading || isSuccess}
          />
        </div>
        <p className={styles.helperText}>Enter the OTP sent to your email address</p>

        {error && <p className={styles.errorText}>{error}</p>}

        {isSuccess && <p className={styles.successText}>OTP verified successfully!</p>}
      </div>

      <div className={styles.resendContainer}>
        <span className={styles.resendText}>Didn't receive the code? </span>
        <button onClick={onResend} className={styles.resendButton} disabled={isLoading}>
          Resend
        </button>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={onBack} className={styles.backButton} disabled={isLoading}>
          Back
        </button>
        <button onClick={onSubmit} className={styles.nextButton} disabled={isLoading || !otp}>
          {isLoading ? "Verifying..." : "Next"}
        </button>
      </div>
    </div>
  )
}

export default OtpForm