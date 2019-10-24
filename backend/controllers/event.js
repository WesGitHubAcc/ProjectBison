const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')
const jwtMiddleWare = expressJwt({secret: 'dragonball'})
//===================================MOSTRA TODOS EVENTOS CADASTRADOS=======================================

router.get('/', (request, response) => {

    database.serialize(() => {

        const select = 'SELECT * FROM event'

        database.all( select, (error, row) => {

            if (error)
                response.status(404).send({ sucess: false, error: err.message })
            else 
                response.status(200).json({ sucess: row, error: false })
        })
    })
})

//===========================================INSERE EVENTO==================================================

router.post('/',(request, response) => {

    const {eventName, eventUrlImage} = request.body

    if(eventUrlImage) 
    {
        database.serialize(() => {
            
            const insertEvent = 'INSERT INTO event (event_name, event_url_image) VALUES (?,?)'
            
            database.run( insertEvent, [eventName, eventUrlImage], (error) => {

                if(error)
                    response.status(400).json({ sucess: false, error: err.message})
                else
                    response.status(201).json({ sucess: 'Dados inseridos com sucesso!', error: false})
            })
        })

    }else
        response.status(400).json({ sucess: false, error: 'Dados informados incorretamente!'}) 

})


//========================================EXCLUI EVENTO PELO ID==============================================

router.delete('/:id',(request, response) => {

    const idEvent = request.params.id

    if( idEvent && idEvent !== 0 ) {

        database.serialize(() => {

            const deleteEvent = 'DELETE FROM event WHERE event_id = ?'

            database.run( deleteEvent, [idEvent], (error) => {

                if(error) 
                    response.status(400).json({ sucess: false, error: error.message })
                else 
                    response.status(200).json({ sucess: 'Evento deletado com sucesso!', error: false})
            })
        } )
    }else
        response.status(404).json({ sucess: false, error: 'ID informado inexistente!'})
})

//============================================================================================================

module.exports = router