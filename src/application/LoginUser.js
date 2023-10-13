export class LoginUser {
  constructor(userRepository, jsonWebTokenManager) {
    this.userRepository = userRepository
    this.jsonWebTokenManager = jsonWebTokenManager
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email)

    return this.jsonWebTokenManager.generate(user.getId())
  }
}
