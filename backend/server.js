const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//=====================ROTAS=========================

const menuRoute = require('./controllers/menu.js')
const userRoute = require('./controllers/users.js')
const eventRoute = require('./controllers/event.js')
const categoryRoute = require('./controllers/category.js')
const reserveRoute = require('./controllers/reserve.js')


app.use('/menu/', menuRoute)
app.use('/user/', userRoute)
app.use('/event/', eventRoute)
app.use('/category/', categoryRoute)
app.use('/reserve/', reserveRoute)


//===============CONFIGURAÇÃO PORTA===================

const port = 3000

app.listen(/*PATH*/port, /*RANDLER*/() => {
    console.log(`Rodando na porta ${port}!`)
})

module.exports = app