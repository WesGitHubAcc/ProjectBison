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


app.use('/menu/', menuRoute)
app.use('/user/', userRoute)


//===============CONFIGURAÇÃO PORTA===================

const port = 3000

app.listen(port, () => {
    console.log(`Rodando na porta ${port}!`)
})

module.exports = app