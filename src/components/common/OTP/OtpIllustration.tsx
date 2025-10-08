import type React from "react"
import styles from "./OtpIllustration.module.css"

const OtpIllustration: React.FC = () => {
  return (
    <div className={styles.illustrationContainer}>
      <img src="/left_logo_image.png" alt="Security illustration" className={styles.illustration} />
    </div>
  )
}

export default OtpIllustration
