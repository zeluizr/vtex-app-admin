export async function accountClientMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients } = context

  context.status = 200
  context.body = await clients.accountclient.getAccount()
  context.set('cache-control', 'no-cache')

  await next()
}
