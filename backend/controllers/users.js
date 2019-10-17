const express = require('express')
const router = express.Router()
const database = require("../database/connection")

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const jwtMiddleWare = expressJwt({secret: 'dragonball'})

//=================================LOGIN USUARIO===================================

router.post('/login', (request, response) => {
    const {userName, userPassword} = request.body

    if(userName, userPassword){
        const selectUser = 'SELECT user_id FROM user WHERE user_name = ? AND user_password = ?'

        database.serialize(() =>{

            database.all(selectUser, [userName, md5(password)], (error, row) =>{

                if(error)
                    response.status(400).json({sucess: false, error: error.message})
                else if (row.length > 0) {
                    const token = jwt.sign({userId: row,  pass: 'dragonball'})
                    response.status(200).json({sucess: false, error: token })
                }else
                    response.status(404).json({ sucess: false, error: 'Usuario ou senha incorreta!'})
            })
        })
    }else
        response.status(400),json ({sucess: false, error: 'Campos não preenchidos'})
})

//=================================LOGOUT USUARIO==================================

router.get('/logout', jwtMiddleWare, (request, response) => {
    response.status(200).json({sucess: false, token: null})
})

//=================================CADASTRA USUARIO=================================

router.post('/', (request , response) => {

    const {userName, userPassword}

    if(userName && userName){
            
        database.serialize(() => {

            const selectUser = 'SELECT user_name FROM user WHERE user_name = ?'

            database.all(selectUser, [userName], (error, row) =>{

                if(row.lenght > 0) 
                    response.status(400).json({sucess: false, error: error.message})
                else
                {
                    const insertUser = 'INSERT INTO user (user_name, user_password) VALUES (?,?)'

                    database.run(insertUser, [userName, md5(userPassword)], (error, row) => {

                        if(error)
                            response.status(404).json({sucess: false, error: error.message})
                        else
                            response.status(201).json({sucess: row, error: false})
                    })
                }
            })
        })
    }else
        response.status(400).json({sucess: false, error: 'Dados não preenchidos'})
})

//============================DELETA USUARIO PELO ID=================================

router.delete('/:id', jwtMiddleWare, (request, response) => {

    const userId = request.params.id 
    
    if(userId && userId !== 0) {

        database.serialize(() => {
            const deleteUser = 'DELETE FROM user WHERE user_id = ?'

            database.run(deleteUser, [userId], (request, response) =>{

                if(error)
                    response.status(400).json({ sucess: false, error: error.message })
                else
                    response.status(200).json({ sucess: 'Usuario deletado com sucesso!', error: false})
            })
        })
    }
})




module.exports = router