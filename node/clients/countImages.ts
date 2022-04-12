import { InstanceOptions, IOClient, IOContext } from '@vtex/api'

export class GetWhoImageInProduct extends IOClient {
    private VLM_BASE_URL: string

    public constructor(private ctx: IOContext, options?: InstanceOptions) {
        super(ctx, {
            ...options,

        })
        this.VLM_BASE_URL = `http://${this.ctx.account}.vtexcommercestable.com.br/api/catalog_system/pub/products/search`
    }

    public async getImagesProduct() {
        return this.http.get(this.VLM_BASE_URL)
    }
}