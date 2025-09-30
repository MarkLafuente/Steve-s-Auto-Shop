import styles from "./Logo.module.css"

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src="/progresso_logo.png" alt="Progresso Logo" className={styles.logo} />
      <p className={styles.subtitle}>Student Performance Insight Dashboard</p>
    </div>
  )
}

export default Logo