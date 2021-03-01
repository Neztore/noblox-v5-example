export class User {
  constructor (client) {
    this.client = client
    this.created = new Date()
  }

  fetch () {
    // Fetches the info from API and stores, returns it.
  }

  isExpired () {
    // Check with Client configuration somehow, maybe something like:
    return (Date.now() - this.created.getTime() > this.client.options.get('userCacheTime'))
  }
}
