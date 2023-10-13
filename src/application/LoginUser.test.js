import { describe, it, expect, vi, beforeEach } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepository/UserRepositoryMock.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"
import { User } from "../domain/models/User.js"
import { JsonWebTokenManagerMock } from "../infrastructure/JsonWebTokenManager/JsonWebTokenManagerMock.js"
import { LoginUsergit } from "./LoginUser.js"

describe("LoginUser", () => {
  let userRepository
  let jsonWebTokenManager

  beforeEach(() => {
    userRepository = new UserRepositoryMock()
    jsonWebTokenManager = new JsonWebTokenManagerMock()
  })

  it("generates a JWT for the given user", async () => {
    const name = "manolo"
    const email = "manolo@gmail.com"
    const age = 45
    const password = "123456"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    const tokenMock = "thisIsAJWTSignedToken"
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    vi.spyOn(jsonWebTokenManager, "generate").mockReturnValue(tokenMock)
    const loginUser = new LoginUser(userRepository, jsonWebTokenManager)

    const token = await loginUser.execute(email, password)

    expect(token).toEqual(tokenMock)
  })
})
