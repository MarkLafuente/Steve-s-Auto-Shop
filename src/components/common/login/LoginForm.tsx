"use client"

import type React from "react"

import Logo from "../Logo"
import RoleSelector from "./RoleSelectors"
import InputField from "../InputField"
import Button from "../Button"
import styles from "./LoginForm.module.css"

interface LoginFormProps {
  role: "student" | "teacher"
  onRoleChange: (role: "student" | "teacher") => void
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

const LoginForm = ({
  role,
  onRoleChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
}: LoginFormProps) => {
  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = "/forgot-password"
  }

  return (
    <div className={styles.formContainer}>
      <Logo />

      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome</h1>
        <p className={styles.welcomeSubtitle}>Choose your role and sign in to continue</p>
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.roleSection}>
          <label className={styles.label}>I am a...</label>
          <RoleSelector selectedRole={role} onRoleChange={onRoleChange} />
        </div>

        <div className={styles.inputSection}>
          <label className={styles.label}>School Email Address</label>
          <InputField
            type="email"
            placeholder="ENTER YOUR PHINMAED EMAIL"
            value={email}
            onChange={onEmailChange}
            icon="email"
          />
          <p className={styles.helperText}>Use your official PHINMA Education email address</p>
        </div>

        <div className={styles.inputSection}>
          <label className={styles.label}>Password</label>
          <InputField
            type="password"
            placeholder="ENTER YOUR PASSWORD"
            value={password}
            onChange={onPasswordChange}
            icon="lock"
          />
          <a href="#" className={styles.forgotPassword} onClick={handleForgotPassword}>
            Forgot Password
          </a>
        </div>

        <Button type="submit" disabled={isLoading}>
          Sign in as {role === "teacher" ? "Teacher" : "Student"}
        </Button>
      </form>

      <footer className={styles.footer}>© 2025 GROUP B. All rights reserved.</footer>
    </div>
  )
}

export default LoginForm