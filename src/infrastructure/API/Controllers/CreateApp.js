export async function createApp() {
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

    return app
}