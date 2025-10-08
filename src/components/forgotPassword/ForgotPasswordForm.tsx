"use client"

import { useForgotPasswordController } from "../controller/useForgotPasswordController"
import InputField from "../common/InputField"
import Button from "../common/Button"
import styles from "./ForgotPasswordForm.module.css"

export default function ForgotPasswordForm() {
  const { state, handleEmailChange, handleSubmit, handleBack } = useForgotPasswordController()

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Forgot Password?</h1>
        <p className={styles.subtitle}>Enter your PHINMA Education email to receive One-time Pin</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>School Email Address</label>
          <InputField
            type="email"
            placeholder="ENTER YOUR PHINMAED EMAIL"
            value={state.email}
            onChange={handleEmailChange}
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.33333 5.83333L10 10.8333L16.6667 5.83333M3.33333 14.1667H16.6667C17.5833 14.1667 18.3333 13.4167 18.3333 12.5V5.83333C18.3333 4.91667 17.5833 4.16667 16.6667 4.16667H3.33333C2.41667 4.16667 1.66667 4.91667 1.66667 5.83333V12.5C1.66667 13.4167 2.41667 14.1667 3.33333 14.1667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            disabled={state.isLoading}
          />
          <p className={styles.helperText}>Enter the email address associated with your account</p>
        </div>

        {state.error && <div className={styles.error}>{state.error}</div>}
        {state.success && <div className={styles.success}>Reset pin sent successfully! Please check your email.</div>}

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleBack} className={styles.backButton} disabled={state.isLoading}>
            Back
          </button>
          <Button type="submit" variant="gradient" disabled={state.isLoading || !state.email}>
            {state.isLoading ? "Sending..." : "Next"}
          </Button>
        </div>
      </form>

      <footer className={styles.footer}>
        <p>© 2026 GROUP B. All rights reserved.</p>
      </footer>
    </div>
  )
}