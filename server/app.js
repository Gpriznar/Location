const express = require('express')
const app = express()
const models = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser())

app.get('/api/previous-locations', async (req, res) => {
  let previousLocations = await models.Locations.findAll()
  res.json(previousLocations)
})

app.post('/api/previous-location', (req,res) => {
  let latitude = req.body.latitude
  let longitude = req.body.longitude

  let previousLocation = models.Locations.build({
    latitude: latitude,
    longitude: longitude
  })

  previousLocation.save()
  .then((newLocations) => {
    res.json({success: true, message: 'Location Saved!'})
  }).catch(error => res.json({success: false, message: 'ERROR: Location Not Saved!'}))
})


app.listen(8080, () => {
  console.log('Server is online...')
})
