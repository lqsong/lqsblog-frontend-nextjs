
import Koa from 'koa'
import Router from '@koa/router'
import next from 'next'

import './env';

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    /* 
    router.get('/demo', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/demo', ctx.query)
      ctx.respond = false
    })
    */

    router.all('(.*)', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })
  
    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })
  
    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
})
