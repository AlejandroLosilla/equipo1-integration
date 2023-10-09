import { beforeEach, describe, expect, it, vi } from "vitest"
import { PostUserController } from "./PostUserController"

describe("PostUserController", () => {
  const name = "John Doe"
  const email = "john@gmail.com"
  const password = "123456"
  const age = 30

  let registerUser
  let postUserController
  let req
  let res

  beforeEach(() => {
    registerUser = {
      execute: vi.fn(),
    }
    postUserController = new PostUserController(registerUser)
    req = {
      body: {
        name,
        email,
        password,
        age,
      },
    }
    res = {
      status: vi.fn(() => res),
      send: vi.fn(),
    }
  })
  it("calls registerUser", async () => {
    await postUserController.execute(req, res)
    expect(registerUser.execute).toHaveBeenCalledWith(name, email, password, age)
  })
  it("responds with status 201 when user is created", async () => {
    await postUserController.execute(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith("User created successfully")
  })
})
