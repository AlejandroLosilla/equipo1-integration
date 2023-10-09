import { DomainError } from "../../domain/errors/DomainError.js"
import { errorCodeMap } from "../API/errorCodeMap.js"

export function errorHandler(err, req, res) {
  const code = errorCodeMap(err.code)
  if (err instanceof DomainError) {
    res.status(code).send({ message: err.message })
  } else {
    res.status(code).send({ message: "Unknown error" })
  }
}
