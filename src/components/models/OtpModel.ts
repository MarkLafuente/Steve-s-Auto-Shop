

export interface OtpModel {
  code: string
  email?: string
}

export interface OtpResponse {
  success: boolean
  message: string
  data?: {
    token?: string
    userId?: string
  }
}

export interface OtpError {
  message: string
  code?: string
}

export interface OtpValidation {
  isValid: boolean
  errors: string[]
}


export const validateOtp = (otp: string): OtpValidation => {
  const errors: string[] = []

  if (!otp || otp.trim() === "") {
    errors.push("OTP is required")
  }

  if (otp.length < 4) {
    errors.push("OTP must be at least 4 digits")
  }

  if (!/^\d+$/.test(otp)) {
    errors.push("OTP must contain only numbers")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}