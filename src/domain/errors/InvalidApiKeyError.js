import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class InvalidApiKeyError extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_API_KEY, "Invalid API key")
  }
}
