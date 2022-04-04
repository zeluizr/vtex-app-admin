export async function eshopperMiddleware(
  ctx: Context, next: () => Promise<any>
) {
  const { state: { url }, clients } = ctx

  ctx.status = 200
  ctx.body = await clients.eshopper.getEshopper(url)
  ctx.set('cache-control', 'no-cache')

  await next()
}
