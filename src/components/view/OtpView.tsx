"use client"



import type React from "react"
import { useOtpController } from "../controller/useOtpController"
import OtpContainer from "../common/OTP/OtpContainer"

interface OtpViewProps {
  email?: string
}

const OtpView: React.FC<OtpViewProps> = ({ email }) => {
  const controller = useOtpController(email)

  return (
    <OtpContainer
      otp={controller.otp}
      isLoading={controller.isLoading}
      error={controller.error}
      isSuccess={controller.isSuccess}
      onOtpChange={controller.setOtp}
      onSubmit={controller.handleSubmit}
      onBack={controller.handleBack}
      onResend={controller.handleResend}
    />
  )
}

export default OtpView