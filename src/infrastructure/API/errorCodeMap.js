import { ErrorCode } from "../../domain/errors/ErrorCode"
export const ErrorMap = {
  [ErrorCode.USER_ALREADY_EXISTS]: 409,
  [ErrorCode.INVALID_API_KEY]: 401,
  [ErrorCode.INVALID_EMAIL]: 400,
  [ErrorCode.INVALID_PASSWORD]: 400,
  [ErrorCode.USER_MUST_BE_18_OR_OLDER]: 400,
  [ErrorCode.UNKNOWN_ERROR]: 500,
}

export const errorCodeMap = (code) => {
  if (ErrorMap[code]) {
    return ErrorMap[code]
  }
  return ErrorMap[ErrorCode.UNKNOWN_ERROR]
}
