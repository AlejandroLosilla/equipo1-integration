import { ErrorCode } from "./ErrorCode.js"
import { DomainError } from "./DomainError.js"

export class InvalidEmailError extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_EMAIL, "Invalid email")
  }
}
