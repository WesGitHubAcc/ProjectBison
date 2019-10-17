const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")

//======================================MOSTRA TODOS ITENS DO MENU===========================================

router.get('/', (request, response) => {
    
    database.serialize(() => {

        const select = 'SELECT item_name, item_price, category_name, item_description, item_url_image FROM item, category WHERE category_id = item_category ORDER BY category_id'

        database.all(select, (error, row) => {

            if (error)
                response.status(404).send({ sucess: false, error: err.message })
            else 
                response.status(200).json({ sucess: row, error: false })
        })
    })
})

//=======================================CADASTRA ITENS NO MENU==============================================

router.post('/', jwtMiddleWare,(request, response) => {

    const {name, price, category, description, image} = request.body

    if(name && price && category && description && image) 
    {
        database.serialize(() => {

            const insertItem = 'INSERT INTO item (item_name, item_price, item_category, item_description, item_url_image) VALUES (?, ?, ?, ?, ?)'
            
            database.run( insertItem, [name, price, category, description, image], (error) => {

                if(error)
                    response.status(400).json({ sucess: false, error: err.message})
                else
                    response.status(201).json({ sucess: 'Dados inseridos com sucesso!', error: false})
            })
        })

    }else
        response.status(400).json({ sucess: false, error: 'Dados informados incorretamente!'}) 

})

//======================================DELETA ITENS DO MENU PELO ID=========================================

router.delete('/:id', jwtMiddleWare,(request, response) => {

    const idItem = request.params.id

    if(idItem && idItem !== 0)
    {
        database.serialize(() => {

            const deleteItem = 'DELETE FROM item WHERE item_id = ?'

            database.run( deleteItem, [idItem], (error) => {

                if(error) 
                    response.status(400).json({ sucess: false, error: error.message })
                else 
                    response.status(200).json({ sucess: 'Item deletado com sucesso!', error: false})
            })
        } )
    }else
        response.status(404).json({ sucess: false, error: 'ID informado inexistente!'})
})

//=======================================EDITA ITENS DO MENU PELO ID=========================================

router.patch('/:id', jwtMiddleWare,(request, response) => {

    const idItem = request.params.id;
    const {name, price, category, description, image} = request.body

    database.serialize(() => {

        selectUserID = 'SELECT item_id FROM item WHERE item_id = ?'

        database.all(selectUserID, idItem, (error, row) => {

            if(row.length > 0)
            {
                if(name && price & category & description & image)
                {
                    const updateItem = 'UPDATE item SET item_name = ?, item_price = ?, item_category = ?, item_description = ?, item_image = ? WHERE item_id = ?'

                    database.run(updateItem, [name, price, category, description, image, idItem], (error, row) =>{
                        
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

