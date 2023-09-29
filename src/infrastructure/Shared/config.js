import dotenv from "dotenv"
dotenv.config()

export const config = {
  mailgun: {
    domain: "sandbox438c8dd938f0410aa1dd0393b97f4f46.mailgun.org",
    authUser: "api",
    apiKey: process.env.MAILGUN_API_KEY,
  },
  testInbox: {
    apiKey: process.env.TESTMAIL_API_KEY,
    namespace: "kcat1",
  },
  mongo: {
    user: "admin",
    password: process.env.MONGO_PASSWORD,
    address: "localhost",
    port: "27017",
  },
  postgres: {
    user: "admin",
    password: process.env.POSTGRES_PASSWORD,
    host: "localhost",
    db: "my-project",
    port: "5431",
  },
  redis: {},
}
