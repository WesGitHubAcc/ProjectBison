const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')
const jwtMiddleWare = expressJwt({ secret: 'dragonball' })
//================================MOSTRA TODOS CLIENTES COM RESERVA==========================================

router.get('/', async (request, response) => {

    const selectReserve = 'SELECT * FROM reserve ORDER BY reserve_date AND reserve_name'

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
    const selectReserveID = 'SELECT * FROM reserve WHERE reserve_cpf = ?'

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

        
        const selectReserve = 'SELECT reserve_date FROM reserve WHERE reserve_cpf = ? AND reserve_date = ?'


        const row = await database.get(selectReserve, [CPF, date])
        if (row !== undefined) {
            response.status(400).json({ sucess: false, error: 'cpf ja existe'}) 
        }
        try {
            const insertReserve = 'INSERT INTO reserve (reserve_cpf, reserve_name,  reserve_last_name, reserve_phone ,reserve_number_peoples, reserve_date) VALUES (?,?,?,?,?, ?)'
            await database.run(insertReserve, [CPF, name, lastName, phone, amountPeoples, date])

            response.status(200).json({ sucess: 'Reserva realizada com sucesso!', error: false })
        } catch (e) {
            response.status(404).json({ sucess: false, error: "Não foi possivel cadastrar" })
        }
    } else
        response.status(400).json({ sucess: false, error: 'Campos nao preenchidos' })
})

//================================DELETA RESERVA DO CLIENTE PELO CPF=========================================

router.delete('/', async (request, response) => {

    const {CPF} = request.body

    const selectReserveID = 'SELECT reserve_cpf FROM reserve WHERE reserve_cpf = ?'
    const rows = database.all(selectReserveID, [CPF])

        if (rows == undefined) 
            response.status(404).json({sucess: false, error: 'Nenhuma reserva neste cpf'})  
            try{ 
                const deleteReserve = 'DELETE FROM reserve WHERE reserve_cpf = ?'
                await database.run(deleteReserve, [CPF])
                response.status(200).json({ sucess: 'Reserva deletada com sucesso!', error: false })
            }catch(e){ 
                    response.status(404).json({ sucess: false, error: "Algo nao esta certo" })
        } 
})
      


//================================EDITA RESERVA DO CLIENTE PELO CPF==========================================

router.patch('/', async (request, response) => {

    const idReserve = request.params.id;
    const { reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate } = request.body

        selectReserveID = 'SELECT reserve_cpf FROM reserve WHERE reserve_cpf = ?'

        database.all(selectReserveID, idReserve, (error, row) => {

            if (row.length > 0) {
                if (name && price & category & description & image) {
                    const updateReserve = 'UPDATE reserve SET reserveCpf, reserve_name, reserve_phone, reserve_number_peaples, reserve_date WHERE reserve_cpf = ?'

                    database.run(updateReserve, [reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate, idReserve], (error, row) => {

                        if (error)
                            response.status(404).json({ sucess: false, error: error.message })
                        else
                            response.status(200).json({ sucess: "Nome alterado!" })
                    })
                }
            } else
                response.status(404).json({ sucess: false, error: 'Usuario não existe' })
        })
})

//===========================================================================================================

module.exports = router