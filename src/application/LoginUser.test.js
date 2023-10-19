import { describe, it, expect, vi, beforeEach } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepository/UserRepositoryMock.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"
import { User } from "../domain/models/User.js"
import { JsonWebTokenManagerMock } from "../infrastructure/JsonWebTokenManager/JsonWebTokenManagerMock.js"
import { LoginUser } from "./LoginUser.js"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
import { WrongPasswordError } from "../domain/errors/WrongPasswordError.js"

describe("LoginUser", () => {
  let userRepository
  let jsonWebTokenManager

  beforeEach(() => {
    userRepository = new UserRepositoryMock()
    jsonWebTokenManager = new JsonWebTokenManagerMock()
  })

  it("must find the user by email"), async () => {
    const email = "manolo@gmail.com"
    const loginUser = new LoginUser(userRepository, jsonWebTokenManager)
    await loginUser.execute(email, "password")

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
  }

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

  it("throws an error if user doesn't exists", async () => {
    const email = "manolo@gmail.com"


    vi.spyOn(userRepository, "findByEmail").mockReturnValue(null)
    const loginUser = new LoginUser(userRepository, jsonWebTokenManager)

    const result = loginUser.execute(email)

    await expect(result).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it("throws an error is password is wrong", async () => {
    const name = "manolo"
    const email = "manolo@gmail.com"
    const age = 45
    const password = "123456"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)


    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    const loginUser = new LoginUser(userRepository, jsonWebTokenManager)
    
    const result = loginUser.execute(email, "invalidPassword")
    
    await expect(result).rejects.toBeInstanceOf(WrongPasswordError)
  })
})
