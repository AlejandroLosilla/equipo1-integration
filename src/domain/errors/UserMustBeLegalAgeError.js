import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class UserMustBe18OrOlderError extends DomainError {
  constructor() {
    super(ErrorCode.USER_MUST_BE_18_OR_OLDER, "User must be 18 or older")
  }
}
