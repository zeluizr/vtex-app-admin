import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class Eshopper extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://eshopper-global-app.vercel.app', context, options)
  }

  public getEshopper(url: string) {
    return this.http.get(`/api/cliente?url=${url}`)
  }
}
