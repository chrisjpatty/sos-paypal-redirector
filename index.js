var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var fetch = require('node-fetch');
const log = require('simple-node-logger').createSimpleLogger('errors.log');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.log(req);
  try {
    const query = req.query;
    console.log(query);
    // const customParams = JSON.parse(query.USER1)
    // const apiUrl = customParams.ENV === 'development' ? 'http://192.168.111.57:53013' : customParams.ORIGIN + '/api'
    fetch(`http://192.168.111.57:3000/api/Payment/activate?${JSON.stringify(query)}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    .then(response => {
      if(response.ok){
        console.log(response, response.ok);
        res.send(true)
      }else{
        response.sendStatus(500)
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(false)
    })
  } catch (e) {
    console.error(e)
  }
})

app.get('/paypal/success', function (req, res, next) {
  const query = req.query;
  const customParams = JSON.parse(query.USER1)
  console.log('success', query);
  res.redirect(`${customParams.ORIGIN}/queue?SECURETOKENID=${query.SECURETOKENID}`)
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
