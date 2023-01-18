
import * as dotenv from 'dotenv'
import Koa from 'koa'
import serve from 'koa-static'
import proxy from 'koa-proxies'

dotenv.config()

const { IOTA_HOST, APP_PORT } = process.env

const app = new Koa()

/**
 * proxy api requests to the iotawatt device
 */
app.use(async (ctx, next) => {
    await next();

    // some files exist in the SD directory but we want to get it from the device instead
    const overrides = [
        '/config.txt',
        '/tables.txt',
    ];

    if (ctx.response.status !== 404 && overrides.indexOf(ctx.originalUrl) === -1) {
        return;
    }

    return proxy(ctx.request.path, {
        target: IOTA_HOST,
        changeOrigin: true,
        logs: true,
    })(ctx, () => {});
})

/**
 * serve static files from the local SD directory
 */
app.use(serve('../SD', {
    index: 'index.htm',
}))

app.listen(APP_PORT)

console.log(`listening on port ${APP_PORT}`)

