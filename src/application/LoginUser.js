import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
import {WrongPasswordError} from "../domain/errors/WrongPasswordError.js"

export class LoginUser {
  constructor(userRepository, jsonWebTokenManager) {
    this.userRepository = userRepository
    this.jsonWebTokenManager = jsonWebTokenManager
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email, password)

    if (!user) {
      throw new UserNotFoundError
    }

    if (!user.compareWith(password)) {
      throw new WrongPasswordError
    }

    return this.jsonWebTokenManager.generate(user.getId())
  }
}
