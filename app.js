//Carregando modulos
    const express = require("express")
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const path = require('path')
    const admin = require('./routes/admin')
    const session = require('express-session')
    const flash = require('connect-flash')
    const mongoose = require('mongoose')

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
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/blogapp").then( () => {
            console.log('Conectado com o Mongo!')
        }).catch( (err) => console.log(`Ocorreu um erro ${err}`))
    //Public
        app.use(express.static(path.join(__dirname, 'public')))
    //sessoins
        app.use(session({
            secret: "cursodenode",  //sempre utilizar uma secret segura
            resave: true,
            saveUninittialzed: true
        }))
        app.use(flash())

        //Middleware
        app.use( function(req, res, next) {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })


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