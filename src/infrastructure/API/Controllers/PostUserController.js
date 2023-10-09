export class PostUserController {
  constructor(registerUser) {
    this.registerUser = registerUser
  }
  execute = async (req, res) => {
    const { name, email, password, age } = req.body
    await this.registerUser.execute(name, email, password, age)
    res.status(201).send("User created successfully")
  }
}
