const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")

//============================MOSTRA TODOS ITENS DO MENU====================================

router.get('/', (request, response) => {
    database.serialize(() => {

        const select = 'SELECT * FROM item'

        database.all(select, (error, row) => {

            if (error)
                response.status(404).send({ sucess: false, error: err.message })
            else 
                response.status(200).json({ sucess: row, error: false })
        })
    })
})

//=====================MOSTRA ITENS POR CATEGORIA SELECIONADA===========================

/*
router.get('/SelectItemCategory', (request, response) => { 

        const {category} = request.body

        if (category && category !== 0 ){

            database.serialize(() => {

                const selectCategoryName = 'SELECT category_name FROM category WHERE category_id = ?' 
                const selectItemCategory = 'SELECT * FROM item WHERE item_category = ?'

                database.all(selectCategoryName, [category], (error, row) => {
            
                    if (error)
                        response.status(404).send({ sucess: false, error: "categoria inexistente!" })
                    else{
                        database.all(selectItemCategory,[selectCategoryName], (error, row) => {
                            response.status(200).json({sucess: row, error: false})  
                        })
                    }
                })
            })
        }else
            response.status(404).send({ sucess: false, error: "erro!" })            
})

*/

//============================CADASTRA ITENS NO MENU===================================

router.post('/', (request, response) => {

    const {name, price, category, description, image} = request.body

    if(name && price && category && description && image) 
    {
        database.serialize(() => {

            const selectCategoryID = "SELECT category_name FROM category WHERE category_id = ?"
            const insertItem = `INSERT INTO item (item_name, item_price, item_category, item_description, item_url_image) VALUES (?, ?, (${selectCategoryID}), ?, ?)`
            
            database.run(insertItem, [name, price, category, description, image], (error) => {

                if(error)
                    response.status(400).json({ sucess: false, error: err.message})
                else
                    response.status(201).json({ sucess: "Dados inseridos com sucesso!", error: false})
            })
        })

    }else
    response.status(400).json({ sucess: false, error: "Dados informados incorretamente!"}) 

})

//===========================DELETA ITENS DO MENU PELO ID===============================

router.delete('/:id', (request, response) => {

    const idItem = request.params.id

    if(idItem && idItem !== 0) {

        database.serialize(() => {

            const deleteItem = "DELETE FROM item WHERE item_id = ?"

            database.run(deleteItem, [idItem], (error) => {

                if(error) 
                    response.status(400).json({ sucess: false, error: error.message })
                else 
                    response.status(200).json({ sucess: 'Item deletado com sucesso!', error: false})
            })
        } )
    }else
        response.status(404).json({ sucess: false, error: "ID informado inexistente!"})
})

module.exports = router