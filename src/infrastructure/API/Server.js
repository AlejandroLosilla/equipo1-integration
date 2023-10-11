import express from "express"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { errorHandler } from "../Middlewares/errorHandler.js"

export class Server {
  constructor() {
    this.dependencies = this.createDependencies()

    this.app = express()
    this.app.use(express.json())
    this.app.post("/users/register", this.dependencies.postUserController.execute)
    this.app.use(errorHandler)
  }

  createDependencies() {
    const userRepository = new UserRepositoryMongo()
    const idGenerator = new IdGeneratorNode()
    const emailSender = new EmailSenderMock()
    const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
    const postUserController = new PostUserController(registerUser)

    return {
      userRepository,
      idGenerator,
      emailSender,
      registerUser,
      postUserController,
    }
  }

  async connect() {
    await this.dependencies.userRepository.connect()
  }

  async disconnect() {
    await this.dependencies.userRepository.disconnect()
  }

  async reset() {
    await this.dependencies.userRepository.reset()
  }

  listen() {
    const port = 3000
    this.app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`)
    })
  }
}
