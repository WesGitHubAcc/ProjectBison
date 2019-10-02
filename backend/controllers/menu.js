const express = require('express')
const router = express.Router()
const database = require("../database/connection")

router.post('/', (request, response) => {

    const {name, price, category, description, image} = request.body

    if(!name && !price && !category && !description && !image) 
    {
        database.serialize(() => {

            const selectCategoryID = "SELECT category_id FROM category WHERE category_name = ?"
            const insertItem = `INSERT INTO item (item_name, item_price, item_category, item_description, item_url_image) VALUES (?, ?, (${selectCategoryID}), ?, ?)`
            
            database.run(insertItem, [name, price, category, description, image], (error) => {

                if(error)
                response.status(400).json({message: "erro na inserção"})
                else
                response.status(201).json({message: "Dado inserido!"})
            })
        })
    }
    else
    response.status(400).json({message: "Dados incorretos"}) 

})

module.exports = router