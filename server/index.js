import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import cors from 'koa2-cors'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
<<<<<<< HEAD
import search from './interface/search'

const app = new Koa()
// const host = process.env.HOST || 'localhost'
=======


const app = new Koa()
// const host = process.env.HOST || '127.0.0.1'
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5
// const port = process.env.PORT || 3000
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
    session({
        key: 'mt',
        prefix: 'mtpx',
        store: new Redis()
    })
)
app.use(
    bodyParser({
        extendTypes: ['json', 'form', 'text']
    })
)
app.use(json())
app.use(cors())

//数据库连接
mongoose.connect(
    dbConfig.dbs,
    {
        userNewUrlParser: true
    }
)
app.use(passport.initialize())
app.use(passport.session())
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
<<<<<<< HEAD
  app.use(search.routes()).use(search.allowedMethods())

=======
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5

  app.use((ctx) => {
    ctx.status = 200
    //ctx.respond = false // Bypass Koa's built-in response handling
    //ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    //nuxt.render(ctx.req, ctx.res)
      return new Promise((resolve,reject)=>{
          ctx.res.on('close',resolve)
          ctx.res.on('finish',resolve)
          nuxt.render(ctx.req, ctx.res,promise=>{
              promise.then(resolve).catch(reject)
          })
      })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
