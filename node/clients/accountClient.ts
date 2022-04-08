import { InstanceOptions, IOClient, IOContext } from '@vtex/api'

const withAuthToken =
  (options: InstanceOptions | undefined) =>
    ({ adminUserAuthToken, authToken }: IOContext) => {
      return {
        ...options?.headers,
        ...(adminUserAuthToken
          ? {
            Authorization: adminUserAuthToken,
            VtexIdclientAutCookie: adminUserAuthToken,
          }
          : { VtexIdclientAutCookie: authToken }),
        'Proxy-Authorization': authToken,
        'X-Vtex-Use-Https': 'true',
        cookie: `_ssid=${adminUserAuthToken}`,
      }
    }

export class GetClientAccountHost extends IOClient {
  private VLM_BASE_URL: string

  public constructor(private ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: withAuthToken(options)(ctx),
    })
    this.VLM_BASE_URL = `http://${this.ctx.account}.vtexcommercestable.com.br/api/vlm/account`
  }

  public async getAccount() {
    return this.http.get(this.VLM_BASE_URL)
  }
}