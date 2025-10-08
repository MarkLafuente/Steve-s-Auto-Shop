"use client"

import { useCallback } from "react"
import { PasswordSuccessService } from "../services/PasswordSuccessService"

export const usePasswordSuccessController = () => {
  const service = new PasswordSuccessService()

  const handleDone = useCallback(() => {
    console.log("[v0] Done button clicked")
    service.handleCompletion()
  }, [])

  return {
    handleDone,
  }
}
