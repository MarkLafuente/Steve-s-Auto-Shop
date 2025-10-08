"use client"

import { usePasswordSuccessController } from "../../controller/PasswordSuccessController"
import styles from "./PasswordSuccess.module.css"

export const PasswordSuccess = () => {
  const { handleDone } = usePasswordSuccessController()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {}
        <div className={styles.illustrationSection}>
          <img src="/left_logo_image.png" alt="Security illustration" className={styles.illustration} />
        </div>

        {}
        <div className={styles.messageSection}>
          <h1 className={styles.title}>
            Password successfully
            <br />
            changed!
          </h1>

          <div className={styles.checkIcon}>
            <img src="/check.png" alt="Success" className={styles.checkImage} />
          </div>

          <button onClick={handleDone} className={styles.doneButton}>
            Done
          </button>
        </div>
      </div>

      <footer className={styles.footer}>© 2025 GROUP 4. All rights reserved.</footer>
    </div>
  )
}