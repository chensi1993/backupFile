const start = () => {
  // https://github.com/node-modules/graceful
  const graceful = require('graceful')
  const now = () => new Date().toISOString().replace(/T/, ' ').replace(/Z/, '')
  const app = require('./app')
  const { serve: { port } } = require('../config')
  const server = app.listen(port, () => {
    console.log(`[${now()}]   worker#${process.pid} rap2-dolores is running as ${port}`)
  })

  graceful({
    servers: [server],
    killTimeout: '10s',
    error: function (err, throwErrorCount) {
      if (err.message) err.message += ` (uncaughtException throw ${throwErrorCount} times on pid:${process.pid})`
      console.error(`[${now()}] worker#${process.pid}] ${err.message}`)
    }
  })
}

start()
