export interface PasswordSuccessProps {
  onComplete?: () => void
}

export interface PasswordSuccessControllerReturn {
  handleDone: () => void
}

export type PasswordSuccessStatus = "success" | "error" | "pending"
