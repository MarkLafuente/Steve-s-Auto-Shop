export interface ForgotPasswordFormData {
  email: string
}

export interface ForgotPasswordState {
  email: string
  isLoading: boolean
  error: string | null
  success: boolean
}

export interface ForgotPasswordValidation {
  isValid: boolean
  errors: {
    email?: string
  }
}