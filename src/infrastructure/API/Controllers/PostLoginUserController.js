export class PostLoginUserController {
  constructor(loginUser) {
  this.loginUser = loginUser
  }
  execute = async (req, res) => {
    const { email, password } = req.body
    await this.loginUser.execute(email, password)

    res.status(200)
  }
}
