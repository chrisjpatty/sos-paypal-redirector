var express = require('express')
var cors = require('cors')
var app = express()
var fs = require('fs');
var http = require('http').Server(app);
var fetch = require('node-fetch');
console.log(fetch);

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

  fs.writeFile("./logs/silent-body.txt", JSON.stringify(req.body));
  // const query = req.query;
  // const customParams = JSON.parse(query.USER1)
  // const apiUrl = customParams.ENV === 'development' ? 'http://192.168.111.57:53013' : customParams.ORIGIN + '/api'
  fetch(`http://192.168.111.57:3001/Payment/silent`, {
    method: 'POST',
    body: JSON.stringify({})
  })
  .then(() => {
    res.send(true)
  })
  .catch(err => {
    //fs.writeFile("./logs/silent-log.txt", JSON.stringify(err));
    console.log("Failed");
    res.send(false)
  })
})

app.get('/paypal/success', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('success', query);
  res.redirect(`${customParams.ORIGIN}/receipt?SECURETOKENID=${query.SECURETOKENID}`)
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
