
export class PasswordSuccessService {
  navigateToLogin(): void {
    
    window.location.href = "/login"
  }

  logSuccessEvent(): void {
    
    console.log("[v0] Password change success event logged")
  }

  clearPasswordResetToken(): void {
    
    localStorage.removeItem("passwordResetToken")
    sessionStorage.removeItem("passwordResetToken")
  }

  handleCompletion(): void {
    this.logSuccessEvent()
    this.clearPasswordResetToken()
    this.navigateToLogin()
  }
}
