

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordResponse {
  success: boolean
  message: string
}

export interface ChangePasswordError {
  field?: "currentPassword" | "newPassword" | "confirmPassword"
  message: string
}

export class ChangePasswordValidator {
  static validateCurrentPassword(password: string): string | null {
    if (!password) {
      return "Current password is required"
    }
    return null
  }

  static validateNewPassword(password: string): string | null {
    if (!password) {
      return "New password is required"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain uppercase, lowercase, and number"
    }
    return null
  }

  static validateConfirmPassword(newPassword: string, confirmPassword: string): string | null {
    if (!confirmPassword) {
      return "Please confirm your password"
    }
    if (newPassword !== confirmPassword) {
      return "Passwords do not match"
    }
    return null
  }

  static validatePasswordsDifferent(currentPassword: string, newPassword: string): string | null {
    if (currentPassword === newPassword) {
      return "New password must be different from current password"
    }
    return null
  }

  static validateAll(data: ChangePasswordData): ChangePasswordError | null {
    const currentError = this.validateCurrentPassword(data.currentPassword)
    if (currentError) {
      return { field: "currentPassword", message: currentError }
    }

    const newError = this.validateNewPassword(data.newPassword)
    if (newError) {
      return { field: "newPassword", message: newError }
    }

    const confirmError = this.validateConfirmPassword(data.newPassword, data.confirmPassword)
    if (confirmError) {
      return { field: "confirmPassword", message: confirmError }
    }

    const differentError = this.validatePasswordsDifferent(data.currentPassword, data.newPassword)
    if (differentError) {
      return { field: "newPassword", message: differentError }
    }

    return null
  }
}
