var express = require('express')
var cors = require('cors')
var app = express()
var http = require('http').Server(app);

app.use(cors())

app.get('/node', function (req, res, next) {
  res.send('Hit the root /node')
})

app.get('/', function (req, res, next) {
  res.send('Hit the root')
})

app.post('/node/silent', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('silent', query);
  res.send('Hit Silent')
})

app.get('/node/success', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('success', query);
  res.send(`${customParams.ORIGIN}/paymenterror?SECURETOKENID=${query.SECURETOKENID}`)
})

app.get('/node/error', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('error', query);
  res.redirect(`${customParams.ORIGIN}/paymenterror?SECURETOKENID=${query.SECURETOKENID}`)
})

http.listen(process.env.PORT || 8080, () => {
  console.log("Listening on: ", process.env.PORT || 8080)
})
