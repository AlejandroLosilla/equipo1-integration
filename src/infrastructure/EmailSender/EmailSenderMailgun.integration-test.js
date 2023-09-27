import { describe, expect, it } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun.js"
import { User } from "../../domain/models/User.js"

describe("EmailSenderMailgun", () => {
  it("sends a welcome email to the user", async () => {
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "alexisplettener@gmail.com"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const emailSender = new EmailSenderMailgun()
    await emailSender.sendWelcomeEmail(user)
  })
})
