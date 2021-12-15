const express = require('express')
require('dotenv').config();
const { dbConnection } = require('./database/config')
const cors = require('cors')

const app = express()

//db
dbConnection();

//CORS
app.use(cors())

//public directory
app.use( express.static('public') )

//body parsing
app.use( express.json() )

//routes
app.use('/api/auth', require('./routes/auth'))

//listen to requests
app.listen( process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`)
    console.log('Up')
})
