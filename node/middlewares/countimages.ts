export async function countImageClientMiddleware(
    context: Context,
    next: () => Promise<unknown>
) {
    const { clients } = context

    context.status = 200
    context.body = await clients.countimages.getImagesProduct()
    context.set('cache-control', 'no-cache')

    await next()
}
