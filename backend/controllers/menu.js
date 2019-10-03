const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")



//============================MOSTRA ITENS DO MENU====================================

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

//============================CADASTRA ITENS NO MENU===================================

router.post('/', (request, response) => {

    const {name, price, category, description, image} = request.body

    if(name && price && category && description && image) 
    {
        database.serialize(() => {

            const selectCategoryID = "SELECT category_name FROM category WHERE category_id = ?"
            const insertItem = `INSERT INTO item (item_name, item_price, item_category, item_description, item_url_image) VALUES (?, ?, (${selectCategoryID}), ?, ?)`
            
            database.run(insertItem, [name, price, category, description, image], (error) => {

                if(error){
                    response.status(400).json({message: "Erro na inserção dados!"})
                }else
                    response.status(201).json({message: "Dados inseridos com sucesso!"})
            })
        })
    }
    else
    response.status(400).json({message: "Dados informados incorretamente!"}) 

})

module.exports = router