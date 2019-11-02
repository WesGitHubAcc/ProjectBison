const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')
const jwtMiddleWare = expressJwt({ secret: 'dragonball' })

//===================================MOSTRA TODOS EVENTOS CADASTRADOS=======================================

router.get('/', async (request, response) => {
    const select = 'SELECT * FROM event'

    const events = await database.all(select)
    if (events == undefined) {
        response.status(404).send({ sucess: false, error: err.message })
    }
    response.status(200).json({ sucess: events, error: false })
})

//===========================================INSERE EVENTO==================================================

router.post('/', async (request, response) => {

    const { eventName, eventUrlImage } = request.body

    if (!eventUrlImage) {
        response.status(400).json({ sucess: false, error: 'Dados informados incorretamente!' })
    }
    const insertEvent = 'INSERT INTO event (event_name, event_url_image) VALUES (?,?)'

    try {
        await database.run(insertEvent, [eventName, eventUrlImage])
        response.status(200).json({ sucess: 'Cadastrado com sucesso', error: false })
    } catch (error) {
        response.status(400).json({ sucess: false, error: "Não foi possivel cadastrar" })
    }
})


//========================================EXCLUI EVENTO PELO ID==============================================

router.delete('/:id', async (request, response) => {

    const idEvent = request.params.id

    if (!idEvent || idEvent === 0) {
        response.status(404).json({ sucess: false, error: 'ID informado inexistente!' })
    }
        const deleteEvent = 'DELETE FROM event WHERE event_id = ?'
        try {
            await database.run(deleteEvent, [idEvent])
            response.status(200).json({ sucess: 'Evento deletado com sucesso!', error: false })
        } catch (error) {
            response.status(400).json({ sucess: false, error: error.message })
        }

    })

    //============================================================================================================

    module.exports = router