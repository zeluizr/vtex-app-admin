import { IOClients } from '@vtex/api'
import { GetClientAccountHost } from './accountClient'
import { GetWhoImageInProduct } from './countImages'
import { Eshopper } from './eshopper'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get eshopper() {
    return this.getOrSet('eshopper', Eshopper)
  }

  public get accountclient() {
    return this.getOrSet('accountclient', GetClientAccountHost)
  }

  public get countimages() {
    return this.getOrSet('countimages', GetWhoImageInProduct)
  }

}
