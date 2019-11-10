const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')

//======================================MOSTRA TODOS ITENS DO MENU===========================================

router.get('/', async (request, response) => {

    const select = 'SELECT i.name, i.price, c.name, i.description, i.image FROM item AS i, category AS c WHERE c.id = itemCategory ORDER BY c.id'

    const items = await database.all(select)
    if (items === undefined) {
        response.status(404).json({ sucess: false, error: "Campos vazios!" })
    }
    response.status(200).json({ sucess: items, error: false })

})

//=======================================CADASTRA ITENS NO MENU==============================================

router.post('/', async (request, response) => {

    const { name, price, category, description, image } = request.body

    if (!name || !price || !category || !description || !image) {
        response.status(400).json({ sucess: false, error: 'Dados informados incorretamente!' })
    }

    const insertItem = 'INSERT INTO item (name, price, itemCategory, description, image) VALUES (?, ?, ?, ?, ?)'

    try {
        await database.run(insertItem, [name, price, category, description, image])
        response.status(201).json({ sucess: 'Dados inseridos com sucesso!', error: false })

    } catch (error) {
        response.status(400).json({ sucess: false, error: "" })
    }

})

//======================================DELETA ITENS DO MENU PELO ID=========================================

router.delete('/:id', async (request, response) => {

    const idItem = request.params.id

    if (!idItem || idItem !== 0) {
        response.status(404).json({ sucess: false, error: 'ID informado inexistente!' })
    }
    const deleteItem = 'DELETE FROM item WHERE id = ?'
    try {
        await database.run(deleteItem, [idItem])
        response.status(200).json({ sucess: 'Item deletado com sucesso!', error: false })
    } catch (error) {
        response.status(400).json({ sucess: false, error: error.message })
    }

})

//=======================================EDITA ITENS DO MENU PELO ID=========================================

router.patch('/:id', async (request, response) => {

    const idItem = request.params.id;
    const { name, price, category, description, image } = request.body

    selectUserID = 'SELECT id FROM item WHERE id = ?'

    const items = await database.all(selectUserID, idItem)

    if (items == 0) {
        response.status(404).json({ sucess: false, error: 'Usuario não existe' })
    }
    if (!name || !price || !category || !description || !image) {
        response.status(400).json({ sucess: false, error: error.message })
    }
    const updateItem = 'UPDATE item SET name = ?, price = ?, itemCategory = ?, description = ?, image = ? WHERE id = ?'

    try {
        await database.run(updateItem, [name, price, category, description, image, idItem])
        response.status(200).json({ sucess: "Nome alterado!" })
    } catch (error) {
        response.status(400).json({ sucess: false, error: error.message })
    }



})

//===========================================================================================================

module.exports = router

