const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")

//================================MOSTRA TODOS CLIENTES COM RESERVA==========================================

router.get('/', (request, response) => {

    database.serialize(() => {

        const selectReserve = 'SELECT * FROM reserve ORDER BY reserve_date AND reserve_name'

        database.all(selectReserve, (error, row) => {

            if(error)
                response.status(404).json({sucess: false, error: error.message })
            else
                response.status(200).json({sucess: row, error: false})
        })
    })
})

//================================MOSTRA RESERVA DO CLIENTE PELO CPF=========================================

router.get('/:id', (request, response) => {

    const idReserve = request.params.id
    const selectReserveID = 'SELECT * FROM reserve WHERE reserve_cpf = ?'

    database.serialize(() => {

        database.all(selectReserveID, idReserve, (error, row) => {

            if(error)
                response.status(404).json({sucess: false, error: error.message })
            else
                response.status(200).json({sucess: row, error: false})
        })
    })
})

//=====================================INSERE RESERVA DO CLIENTE=============================================

router.post('/', (request, response) => {

    const {reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate} = request.body

    if(reserveCpf && reserveName && reservePhone && reserveNumberPeaples && reserveDate)
    {
        database.serialize(() => {

            const selectReserve = 'SELECT reserve_date FROM reserve WHERE reserve_cpf = ? AND reserve_date = ?'
            
            database.all(selectReserve, [reserveCpf, reserveDate], (error, row) =>{

                if(row.length > 0)
                    response.status(401).json({sucess: false, error: 'Já existe uma reserva nesta data com esse cpf'})
                else
                {
                    const insertReserve = 'INSERT INTO reserve (reserve_cpf, reserve_name, reserve_phone ,reserve_number_peaples, reserve_date) VALUES (?,?,?,?,?)'
                    
                    database.run(insertReserve, [reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate], (error) => {

                        if(error)
                            response.status(404).json({sucess: false, error: error.message})
                        else
                            response.status(200).json({sucess: 'Reserva realizada com sucesso!', error: false})
                    })
                }
            })
        })
    }else
        response.status(400).json({sucess: false, error: 'Campos nao preenchidos'})
})

//================================DELETA RESERVA DO CLIENTE PELO CPF=========================================

router.delete('/:id', (request, response) => {

    const idReserve = request.params.id 
    const selectReserveID = 'SELECT reserve_id FROM reserve WHERE reserve_id = ?'

    database.serialize(() => {

        database.all(selectReserveID, [idReserve], (error, row) => {

            if(row.length > 0)
            {
                const deleteReserve = 'DELETE FROM reserve WHERE reserve_id = ?'

                database.run(deleteReserve, [idReserve], (error) => {

                    if(error)
                        response.status(404).json({sucess: false, error: error.message})
                    else
                        response.status(200).json({sucess: 'Reserva deletada com sucesso!', error: false})
                })
            }else
                response.status(400).json({sucess: false, error: 'Nenhum registro encontrado'})
        })
    })
})

//================================EDITA RESERVA DO CLIENTE PELO CPF==========================================

router.patch('/:id', (request, response) => {

    const idReserve = request.params.id;
    const {reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate} = request.body

    database.serialize(() => {

        selectReserveID = 'SELECT reserve_id FROM reserve WHERE reserve_id = ?'

        database.all(selectReserveID, idReserve, (error, row) => {

            if(row.length > 0)
            {
                if(name && price & category & description & image)
                {
                    const updateReserve = 'UPDATE reserve SET reserveCpf, reserve_name, reserve_phone, reserve_number_peaples, reserve_date WHERE reserve_id = ?'

                    database.run(updateReserve, [reserveCpf, reserveName, reservePhone, reserveNumberPeaples, reserveDate, idReserve], (error, row) =>{

                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "Nome alterado!"})
                    })
                }    
            }else
                response.status(404).json({ sucess: false, error: 'Usuario não existe'})    
        })
    })
})

//===========================================================================================================

module.exports = router