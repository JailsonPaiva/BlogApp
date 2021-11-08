//Carregando modulos
    const express = require("express")
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const path = require('path')
    const admin = require('./routes/admin')
    //const mongoose = require('mongoose')

//Configurações
    //Body-Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main',runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: false,
                }}))
        app.set('view engine', 'handlebars')
    //Mongoose
    //Public
        app.use(express.static(path.join(__dirname, 'public')))


// //Rotas
    app.get('/', (req, res) => {
        res.send('Página inicial')
    })
    app.get('/posts', (req, res) => {
        res.send('Lista de posts')
    })
    app.use('/admin', admin)

//Outros
    const PORT = 8081
    app.listen(PORT, () => {
        console.log('Servidor rodando!!!')
    })