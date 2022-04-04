import { JanusClient } from '@vtex/api'

const BASE_URL = '/api/license-manager'

const routes = {
  accountData: `${BASE_URL}/account`,
}

export default class AccountClient extends JanusClient {
  public getAccountClient () {
    return this.http.get(routes.accountData, {
      headers: {
        VtexIdclientAutCookie: this.context.authToken,
      }
    })
  }
}
