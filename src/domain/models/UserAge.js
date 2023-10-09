import { UserMustBe18OrOlderError } from "../errors/UserMustBeLegalAgeError.js"

export class UserAge {
  constructor(age) {
    this.age = age

    if (age < 18) {
      throw new UserMustBe18OrOlderError()
    }
  }

  equals(other) {
    return this.age === other.age
  }
}
