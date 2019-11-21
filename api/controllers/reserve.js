const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')
const cpfCheck = require('cpf-check')
const jwtMiddleWare = expressJwt({ secret: 'dragonball' })

//================================MOSTRA TODOS CLIENTES COM RESERVA==========================================

router.get('/', async (request, response) => {

    const selectReserve = 'SELECT * FROM reserve ORDER BY date AND name'

    const rows = await database.all(selectReserve)

    try {
        if (rows.length > 0)
            response.status(200).json({ sucess: rows, error: false })
    }
    catch (e) {
        console.log(e)
        response.status(404).json({ sucess: false, error: "Erro ao retornar usuario" })
    }
})

//================================MOSTRA RESERVA DO CLIENTE PELO CPF=========================================

router.get('/:id', (request, response) => {

    const idReserve = request.params.id
    const selectReserveID = 'SELECT * FROM reserve WHERE CPF = ?'

    database.serialize(() => {

        database.all(selectReserveID, idReserve, (error, row) => {

            if (error)
                response.status(404).json({ sucess: false, error: error.message })
            else
                response.status(200).json({ sucess: row, error: false })
        })
    })
})

//=====================================INSERE RESERVA DO CLIENTE=============================================

router.post('/', async (request, response) => {

    const { CPF, name, lastName, phone, amountPeoples, date } = request.body
    if (CPF && name && lastName && phone && amountPeoples && date) {


        const selectReserve = 'SELECT date FROM reserve WHERE CPF = ? AND date = ?'


        const row = await database.get(selectReserve, [CPF, date])
        if (row !== undefined) {
            response.status(400).json({ sucess: false, error: 'Ja existe uma reserva nesta data' })
        }
        try {
            const insertReserve = 'INSERT INTO reserve (CPF, name,  lastName, phone , amountPeoples, date) VALUES (?,?,?,?,?,?)'
            await database.run(insertReserve, [CPF, name, lastName, phone, amountPeoples, date])

            response.status(200).json({ sucess: 'Reserva realizada com sucesso!', error: false })
        } catch (e) {
            response.status(404).json({ sucess: false, error: "Não foi possivel cadastrar" })
        }
    } else
        response.status(400).json({ sucess: false, error: 'Campos nao preenchidos' })
})

//================================DELETA RESERVA DO CLIENTE PELO ID=========================================

router.delete('/:id', async (request, response) => {

    const idReserve = request.params.id

    const selectReserveID = 'SELECT CPF FROM reserve WHERE id = ?'
    const rows = database.all(selectReserveID, idReserve)


    if (rows.length == undefined)
        response.status(404).json({ sucess: false, error: 'Nenhuma reserva neste cpf' })
    try {
        const deleteReserve = 'DELETE FROM reserve WHERE id = ?'
        await database.run(deleteReserve, idReserve)
        response.status(200).json({ sucess: 'Reserva deletada com sucesso!', error: false })
    } catch (e) {
        response.status(404).json({ sucess: false, error: "Algo nao esta certo" })
    }
})



//================================EDITA RESERVA DO CLIENTE PELO CPF==========================================

router.patch('/', async (request, response) => {

    const { CPF, name, lastName, phone, amountPeoples, date } = request.body

    selectReserveID = 'SELECT CPF FROM reserve WHERE CPF = ?'

    const reserves = await database.get(selectReserveID, [CPF])

    if (reserves == undefined) {
        response.status(404).json({ sucess: false, error: 'Usuario não existe' })
    }
    /* if(!cpfCheck(CPF)) {
         response.status(404).json({ sucess: false, error: 'Erro ao reconhecer o CPF'})
     }*/
    if (!CPF || !name || !lastName || !phone || !amountPeoples || !date) {
        response.status(404).json({ sucess: false, error: 'Preencha os campos' })
    }
    try {
        const updateReserve = 'UPDATE reserve SET name = ?, lastName = ?, phone = ?, amountPeoples = ?, date = ? WHERE CPF = ?'
        await database.run(updateReserve, [name, lastName, phone, amountPeoples, date, reserves.CPF])
        response.status(200).json({ sucess: "Nome alterado!" })
    }
    catch (error) {
        console.log(error)
        response.status(404).json({ sucess: false, erro: 'Deu ruim' })
    }




})

//===========================================================================================================

module.exports = router