import { DomainError } from "../../domain/errors/DomainError.js"
import { errorCodeMap } from "../API/errorCodeMap.js"

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const code = errorCodeMap(err.code)
  if (err instanceof DomainError) {
    res.status(code).send({ message: err.message })
  } else {
    console.log(err)
    res.status(code).send({ message: "Unknown error" })
  }
}
