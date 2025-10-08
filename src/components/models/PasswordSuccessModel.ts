
export interface IPasswordSuccessModel {
  message: string
  timestamp: Date
  isSuccess: boolean
}

export class PasswordSuccessModel implements IPasswordSuccessModel {
  message: string
  timestamp: Date
  isSuccess: boolean

  constructor() {
    this.message = "Password successfully changed!"
    this.timestamp = new Date()
    this.isSuccess = true
  }

  getMessage(): string {
    return this.message
  }

  getTimestamp(): Date {
    return this.timestamp
  }

  getSuccessStatus(): boolean {
    return this.isSuccess
  }
}
