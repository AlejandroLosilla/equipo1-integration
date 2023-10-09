import { errorCodeMap } from "./errorCodeMap.js"
import { describe, it, expect } from "vitest"

describe("errorCodeMap", () => {
  describe("when the error code is mapped", () => {
    it("returns the HTTP status code", () => {
      expect(errorCodeMap("USER_ALREADY_EXISTS")).toEqual(409)
    })
  })

  describe("when the error code is not mapped", () => {
    it("returns the HTTP status code", () => {
      expect(errorCodeMap("UNKNOWN_ERROR")).toEqual(500)
    })
  })
})
