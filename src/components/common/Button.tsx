"use client"

import type React from "react"
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gradient"
}

const Button = ({ children, type = "button", disabled = false, variant, className, ...rest }: ButtonProps) => {
  const classNames = [styles.button, variant ? (styles as any)[variant] : "", className].filter(Boolean).join(" ")
  return (
    <button type={type} disabled={disabled} className={classNames} {...rest}>
      {children}
    </button>
  )
}

export default Button