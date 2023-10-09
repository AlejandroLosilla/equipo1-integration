import express from "express"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { errorHandler } from "../Middlewares/errorHandler.js"

const app = express()
const port = 3000

app.use(express.json())

const userRepository = new UserRepositoryMongo()
const idGenerator = new IdGeneratorNode()
const emailSender = new EmailSenderMock()
const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const postUserController = new PostUserController(registerUser)

app.post("/users/register", postUserController.execute)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
