import express from "express"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { errorHandler } from "../Middlewares/errorHandler.js"

export async function createApp() {
  const app = express()

  app.use(express.json())

  const userRepository = new UserRepositoryMongo()
  const idGenerator = new IdGeneratorNode()
  const emailSender = new EmailSenderMock()
  const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
  const postUserController = new PostUserController(registerUser)

  await userRepository.connect()

  app.post("/users/register", postUserController.execute)

  app.get("/hello_world", (req, res) => {
    res.json({ hola: "mundo" })
  })
  app.use(errorHandler)

  return app
}
