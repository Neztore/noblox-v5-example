import { User } from './users/User'

export class Client {
  constructor (cookie) {
    if (cookie) {
      this.setCookie(cookie)
    }

    this.users = new Map()

    // Could add Client.ready as a promise which resolves when all set-up (i.e. setCookie) is done
    // Config for caching etc. could be moved to an object passed in, rather than a JSON file.
  }

  async setCookie (newCookie) {
    // Validate via. http
    this.cookie = newCookie
  }

  async getPlayerInfo (userId) {
    const id = parseInt(userId, 10)
    if (this.users.has(id)) {
      const user = this.users.get(userId)
      if (!user.isExpired()) return user
    }

    return this.getUser()
  }

  async getUser (userId) {
    const u = new User()
    const i = await u.fetch()
    this.users.set(userId, u)
    return i
  }
}
