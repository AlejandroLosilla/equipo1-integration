export class PostUserController {
  constructor(registerUser) {
    this.registerUser = registerUser
  }
  execute = async (req, res) => {
    const { name, email, password, age } = req.body
    try {
      await this.registerUser.execute(name, email, password, age)
      await res.status(201).send("User created successfully")
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}
