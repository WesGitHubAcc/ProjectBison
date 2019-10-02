const express = require('express')
const router = express.Router()
const database = require("../database/connection")

router.post('/', (request, response) => {

    const { username, password } = request.body

    if (username && password ) {
        database.serialize(() => {
            const select = 'SELECT user FROM User WHERE user_name = ?'
            database.all(select, [username], (err, row) => {
                if (row.length > 0)
                    response.status(401).json({ sucess: false, err: 'Nome de usuário já existe!' })
                else {
                    const insert = 'INSERT INTO User (user_name, user_password, user_type) VALUES (?,?, user)'
                    database.run(insert, [username, md5(password)], (err) => {
                        if (err)
                            response.status(400).json({ sucess: false, err: 'Não foi possivel faz o cadastro, por favor tente mais tarde!' })
                        else
                            response.status(201).json({ sucess: 'Usuario criado com sucesso!', err: false })
                    })
                }
            })

        })
    }
    else 
        response.status(400).json({ sucess: false, err: 'Preencha os campos corretamente!'})
    

})

module.exports = router