"use strict";
const User = use("App/Models/User");

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);
    token.user = await User.findBy("email", email);
    return token;
  }
}

module.exports = SessionController;
