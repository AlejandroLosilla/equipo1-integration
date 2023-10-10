import tepper from "tepper"
import { expect, describe, it } from "vitest"
import { app } from "./App"

describe("GET /hello_world with status 200", () => {
  it("should return 200 OK", async () => {
    const { body } = await tepper(app).get("/hello_world").run()

    expect(body).toEqual({ hola: "mundo" })
  })
})
