import { EmailSender } from "../../domain/services/EmailSender.js"
import { API_KEY } from "../../temp.js"

export class EmailSenderMailgun extends EmailSender {
  sendWelcomeEmail(user) {
    const body = new FormData()
    const domain = "sandbox438c8dd938f0410aa1dd0393b97f4f46.mailgun.org"
    const url = `https://api.mailgun.net/v3/${domain}/messages`
    const options = {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`api:${API_KEY}`)}`,
      },
      body,
    }
    const from = `Excited User <mailgun@${domain}>`
    const to = user.email.email
    const subject = "Welcome"
    const text = "Welcome to my app"

    body.append("from", from)
    body.append("to", to)
    body.append("subject", subject)
    body.append("text", text)

    return fetch(url, options)
  }
}
