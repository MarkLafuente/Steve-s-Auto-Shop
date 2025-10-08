import styles from "./ForgotPasswordContainer.module.css"
import ForgotPasswordForm from "./ForgotPasswordForm"
import ForgotPasswordIllustration from "./ForgotPasswordIllustration"

export default function ForgotPasswordContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <ForgotPasswordIllustration />
      </div>
      <div className={styles.rightSection}>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}