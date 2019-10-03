const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//=====================ROUTES=========================

const menuRoute = require('./controllers/menu.js')
const userRoute = require('./controllers/users.js')


app.use('/menu/', menuRoute)
app.use('/user/', userRoute)

app.listen(3000, () => {
    console.log("Rodando na porta: 3000...")
})

module.exports = app