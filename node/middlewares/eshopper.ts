export async function eshopperMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients } = context

  context.status = 200
  context.body = await clients.eshopper.getEshopper('centauro.com.br')
  context.set('cache-control', 'no-cache')

  await next()
}
