const express = require('express')
const router = express.Router()
const database = require("../database/connection.js")
const expressJwt = require('express-jwt')
const jwtMiddleWare = expressJwt({ secret: 'dragonball' })

//===================================MOSTRA ITENS PELO ID DA CATEGORIA SELECIONADA============================

router.get('/:id', async (request, response) => {

    const IDcategory = request.params.id

    if (IDcategory && IDcategory !== 0) {

        const itensCategory = 'SELECT * FROM item WHERE itemCategory = ?'

        const rows = await database.all(itensCategory, [IDcategory])
        if (rows == undefined) {
            response.status(400).json({ sucess: false, error: "Usuário não existe" })
        }
        response.status(200).json({ sucess: rows, error: false })


    } else
        response.status(404).send({ sucess: false, error: "erro!" })
})

//===================================MOSTRA AS CATEGORIA SELECIONADA============================

router.get("/", async (request, response) => {
    const selectCategory = 'SELECT id FROM category'

    const category = await database.all(selectCategory)
    if (category === undefined) {
        response.status(404).json({ sucess: false, error: "Campos vazios!" })
    }
    response.status(200).json({ sucess: items, error: false })
})
//===========================================CADASTRA CATEGORIA===============================================

router.post('/', async (request, response) => {
    const name = request.body.name;

    if (!name) {
        response.status(400).json({ sucess: false, error: 'Erro ao cadastrar' })
    }
    const insertCategory = 'INSERT INTO category (name) VALUES (?)'
    try {
        await database.run(insertCategory, [name])
        response.status(200).json({ sucess: 'Categoria cadastrada com sucesso', error: false })
    } catch (error) {
        response.status(400).json({ sucess: false, error: "Erro ao cadastrar" })
    }

})

//=======================================DELETA CATEGORIA PELO ID=============================================

router.delete('/:id', async (request, response) => {

    const categoryID = request.params.id

    if (!categoryID || categoryID === 0) {
        response.status(404).json({ sucess: false, error: 'Preencha os campos' })
    }
    const deleteCategory = 'DELETE FROM category WHERE id = ?'

    try {
        await database.run(deleteCategory, [categoryID])
        response.status(200).json({ sucess: "Categoria deletada com sucesso!", error: false })
    } catch (error) {
        response.status(404).json({ sucess: false, error: error.message })
    }
})

//=====================================ALTERA NOME DA CATEGORIA PELO ID=======================================

router.put('/:id', (request, response) => {

    const categoryID = request.params.id
    const name = request.body.name

    if (!categoryID || categoryID == 0 || !name) {
        response.status(404).json({ sucess: false, error: 'Preencha os dados corretamente' })
    }

    const updateCategory = 'UPDATE category SET category_name = ? WHERE category_id = ?'
    try {
        database.run(updateCategory, [name, categoryID])
        response.status(200).json({ sucess: 'Categoria alterada com sucesso!', error: false })
    } catch (error) {
        response.status(404).json({ sucess: false, error: error.message })
    }

})

//============================================================================================================

module.exports = router 