var express = require('express')
var cors = require('cors')
var app = express()
var http = require('http').Server(app);

app.use(cors())

app.get('/paypal', function (req, res, next) {
  res.send('Hit the root /paypal')
})

app.get('/', function (req, res, next) {
  res.send('Hit the root ')
})

app.get('/paypal/test', function (req, res, next) {
  res.send('Hit the paypal test route')
})

app.post('/paypal/test', function (req, res, next) {
  res.send('Hit the paypal test route (post)')
})

app.post('/paypal/silent', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('silent', query);
  res.send('Hit Silent')
})

app.get('/paypal/success', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('success', query);
  res.send(`${customParams.ORIGIN}/paymenterror?SECURETOKENID=${query.SECURETOKENID}`)
})

app.get('/paypal/error', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('error', query);
  res.redirect(`${customParams.ORIGIN}/paymenterror?SECURETOKENID=${query.SECURETOKENID}`)
})

http.listen(process.env.PORT || 8080, () => {
  console.log("Listening on: ", process.env.PORT || 8080)
})
