const http = require('http')
const finalhandler = require('finalhandler')
const Router = require('router')
const bodyParser = require('body-parser')

const router = new Router()

const messages = []
let nextId = 1

class Message {
  constructor (messsage) {
    this.id = nextId
    this.message = messsage
    nextId++
  }
}

// router.use([path], ...middleware)
// bodyParser untuk terima paramater dari postman
router.use(bodyParser.json())

// router.use([path], ...middleware)
router.get('/', function (req, res) {
  res.end('Hello Node World!')
})

router.get('/message', function (req, res) {
  res.end(JSON.stringify(messages))
})

router.post('/message', function (req, res) {
  console.log('🚀 ~ file: index.js ~ line 29 ~ router.post ~ req', req.body)
  // Save the message and send the message id back to the client
  const newMessage = new Message(req.body.message)
  messages.push(newMessage)
  res.end(JSON.stringify(newMessage.id))
})

const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response))
})

server.listen(3000, () => {
  console.log(
    'Server is up and listening on http://localhost:3000. ini serverku'
  )
})
