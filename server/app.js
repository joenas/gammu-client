// https://node-postgres.com/guides/async-express
// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

const db = require('./db')

function clientErrorHandler (err, req, res, next) {
  console.error(err.stack)
  if (req.accepts(['html', 'json']) === 'json') {
    res.setHeader('content-type', 'application/json')
    res.status(500).send({ message: "Something went wrong, check your logs" })
  } else {
    next(err)
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/sms.json', async (req, res, next) => {
  try {
    const { rows } = await db.fetchAll()
    let items = rows.reduce(function(groups, item) {
      const val = item["number"]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
    res.send({items: items, ids: Object.keys(items)})
  } catch(err) {
      next(err)
  }
})

app.post('/sms.json', async (req, res, next) => {
  const { number, text } = req.body
  try {
    const { rows } = await db.createSms(number, text)
    res.send(rows[0])
  } catch(err) {
    next(err)
  }
})
if (process.env.SERVE_STATIC === '1') {
  const staticFiles = express.static(path.join(__dirname, '../client/build')
  // Serve any static files
  app.use(staticFiles)
  // Handle React routing, return all requests to React app
  app.use('/*', staticFiles)
  // app.get('*', function(req, res) {
  //   const staticFiles = express.static(path.join(__dirname, '../../client/build'))
  //   res.sendFile(path.join(__dirname, '..client', 'build', 'index.html'))
  // });
}

app.use(clientErrorHandler)
app.listen(port, () => console.log(`Listening on port ${port}`))
