import { expect, describe, it, beforeAll, afterAll, beforeEach } from "vitest"
import { Server } from "./Server.js"
import tepper from "tepper"

describe("E2E Server tests", () => {
  const server = new Server()

  beforeAll(async () => {
    await server.connect()
    server.listen()
  })

  afterAll(async () => {
    await server.disconnect()
  })

  beforeEach(async () => {
    await server.reset()
  })

  it("should register a user", async () => {
    const app = server.app

    const response = await tepper(app)
      .post("/users/register")
      .send({
        name: "hola",
        email: "1234@56789.com",
        password: "123456",
        age: 18,
      })
      .run()

    expect(response.status).toEqual(201)

    const response2 = await tepper(app)
      .post("/users/login")
      .send({
        email: "1234@56789.com",
        password: "123456",
      })
      .run()
    
    expect(response2.status).toEqual(200)
    expect(response2.body.token).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
  })

})
