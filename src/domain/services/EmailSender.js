export class EmailSender {
  /**
   * Generates a new id
   * @param {User} user
   * @returns {Promise<Response>}
   */
  // eslint-disable-next-line no-unused-vars
  sendWelcomeEmail(user) {
    throw new Error("This is an abstract class. You should implement the send method")
  }
}
