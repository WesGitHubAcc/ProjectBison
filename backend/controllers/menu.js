const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")

//============================MOSTRA TODOS ITENS DO MENU================================

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


router.get('/SelectItemCategory/:id', (request, response) => { 

        const IDcategory = request.params.id

        if (IDcategory && IDcategory !== 0 ){

            database.serialize(() => {

                const itensCategory = "SELECT * FROM item WHERE item_category = ?"

                database.all(itensCategory, [IDcategory], (error, row) => {
            
                    if (error)
                        response.status(404).send({ sucess: false, error: "categoria inexistente!" })
                    else
                        response.status(200).json({sucess: row, error: false})  
                })
            })    
        }else
            response.status(404).send({ sucess: false, error: "erro!" })            
})


//============================CADASTRA ITENS NO MENU===================================

router.post('/', (request, response) => {

    const {name, price, category, description, image} = request.body

    if(name && price && category && description && image) 
    {
        database.serialize(() => {

            const insertItem = `INSERT INTO item (item_name, item_price, item_category, item_description, item_url_image) VALUES (?, ?, ?, ?, ?)`
            
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

//===========================DELETA ITENS DO MENU PELO ID==============================

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

//============================EDITA ITENS DO MENU PELO ID==============================

router.patch('/:id', (request, response) => {

    const idItem = request.params.id;
    const {name, price, category, description, image} = request.body

    database.serialize(()=>{

        selectUserID = 'SELECT item_id FROM item WHERE item_id = ?'

        database.all(selectUserID, idItem, (error, row) => {

            if(row.length > 0) {

                if(name){
                    database.run('UPDATE item SET item_name = ? WHERE item_id = ?', [name, idItem], (error, row) =>{
                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "Nome alterado!"})
                    })
                }    
                if(price){
                    database.run('UPDATE item SET item_price = ? WHERE item_id = ?', [price, idItem], (error, row) =>{
                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "preço alterado!"})
                    })
                } 
                if(category){
                    database.run('UPDATE item SET item_category = ? WHERE item_id = ?', [category, idItem], (error, row) =>{
                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "Categoria alterada!"})
                    })
                } 
                if(description){
                    database.run('UPDATE item SET item_description = ? WHERE item_id = ?', [description, idItem], (error, row) =>{
                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "Descrição alterada!"})
                    })
                } 
                if(image){
                    database.run('UPDATE item SET item_image = ? WHERE item_id = ?', [image, idItem], (error, row) =>{
                        if(error)
                            response.status(404).json({ sucess: false, error: error.message})
                        else
                            response.status(200).json({ sucess: "Nome alterado!"})
                    })
                } 
            }else{
                response.status(404).json({ sucess: false, error: 'Usuario não existe'})
            }
        })
    })


})

module.exports = router

