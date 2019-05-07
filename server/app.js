const express = require('express')
const app = express()
const models = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = 8080
const bcrypt = require('bcrypt')
const saltRounds = 10


app.use(cors())
app.use(bodyParser.json())


function authenticate(req,res, next) {

  let headers = req.headers["authorization"]

  let token = headers.split(' ')[1]

  jwt.verify(token, 'secret', (err, decoded) => {
    if(decoded) {
      if(decoded.userId) {
        userId = decoded.userId
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

  models.User.findAll({
    where: {
      username: username,
      password: password

      // THIS IS WHERE YOU NEED TO DECODE THE TOKEN AND LINK THE TOKEN TO THE USERID
      
    }
  })
  .then((user) => {
    console.log(user)
  if(user) {

    jwt.sign({ userId: user},  'secret', function(err, token) {
      console.log(user)
       if(token) {
         res.json({token: token})
       } else {
         res.status(500).json({message: 'Unable to generate token'})
       }
     })
    }
  })
})

app.get('/api/previous-locations', async (req, res) => {
  let previousLocations = await models.Location.findAll()
  res.json(previousLocations)
})

app.post('/api/save-location', (req,res) => {
  let latitude = req.body.latitude
  let longitude = req.body.longitude

  let previousLocation = models.Location.build({
    latitude: latitude,
    longitude: longitude
  })

  previousLocation.save()
  .then((newLocations) => {
    res.json({success: true, message: 'Location Saved!'})
  }).catch(error => res.json({success: false, message: 'ERROR: Location Not Saved!'}))
})

// Register Post

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err,hash) {

    let username = req.body.username
    let password = hash

    let newUser = models.User.build({
      username: username,
      password: password
    })
    models.User.findOne({
      where: {username : req.body.username}
    }).then(function (result) {
      if (null !=result) {
        console.log('USERNAME ALREADY EXISTS:', result.username);
      }
      else {
        newUser.save().then(function(newUser){

        })
      }
    })
  })
})


app.listen(PORT, () => {
  console.log('Server is online...')
})
