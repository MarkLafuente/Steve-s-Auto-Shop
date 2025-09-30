"use client"

import { useState } from "react"
import useLoginController from "../../controller/useLoginController"
import LoginForm from "./LoginForm"
import LoginIllustration from "./LoginIllustration"
import styles from "./LoginContainer.module.css"

const LoginContainer = () => {
  const [role, setRole] = useState<"student" | "teacher">("teacher")
  const { email, password, handleEmailChange, handlePasswordChange, handleSubmit, isLoading } = useLoginController()

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <LoginForm
          role={role}
          onRoleChange={setRole}
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
      <div className={styles.rightSection}>
        <LoginIllustration />
      </div>
    </div>
  )
}

export default LoginContainer
