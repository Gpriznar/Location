const express = require('express')
const app = express()
const models = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const users = [
  {username: 'aaa',
   password: 'aaa'
 }
]

app.use(cors())
app.use(bodyParser.json())

function authenticate(req,res, next) {

  let headers = req.headers["authorization"]

  let token = headers.split(' ')[1]

  jwt.verify(token, 'secret', (err, decoded) => {
    if(decoded) {
      if(decoded.username) {
        next()
      } else {
        res.status(401).json({message: 'Token Invalid'})
      }
    } else {
      res.status(401).json({message: 'Token Invalid'})
    }
  })

}

app.post('/login', (req,res) => {

  let username = req.body.username
  let password = req.body.password

  let user = users.find((u) => {
    return u.username == username && u.password == password
  })

  if(user) {

    jwt.sign({ username: username },  'secret', function(err, token) {
       if(token) {
         res.json({token: token})
       } else {
         res.status(500).json({message: 'Unable to generate token'})
       }
    });
  }
})

app.get('/api/previous-locations', async (req, res) => {
  let previousLocations = await models.Locations.findAll()
  res.json(previousLocations)
})

app.post('/api/save-location', (req,res) => {
  let latitude = req.body.latitude
  let longitude = req.body.longitude

  let previousLocation = models.Locations.build({
    latitude: latitude,
    longitude: longitude
  })

  app.get('/login', (req,res) =>  {
    res.render('login')
  })

  previousLocation.save()
  .then((newLocations) => {
    res.json({success: true, message: 'Location Saved!'})
  }).catch(error => res.json({success: false, message: 'ERROR: Location Not Saved!'}))
})


app.listen(8080, () => {
  console.log('Server is online...')
})
