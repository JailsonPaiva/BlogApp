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
    require("./models/Postagem")
    const Postagem = mongoose.model("Postagem")
    require("./models/Categoria")
    const Categoria = mongoose.model("Categoria")
    const usuarios = require('./routes/usuario')
    const passport = require("passport")
    require("./config/auth")(passport)
    const db = require("./config/db")
    


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
        mongoose.connect(db.mongoURI).then( () => {
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
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())

        //Middleware
        app.use( function(req, res, next) {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })


// //Rotas
    app.get("/", (req,res) => {
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
    })

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            } else{
                req.flash("error_msg", "Esta postagem não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    
    app.get("/categorias", (req, res) => {
        Categoria.find().then((categorias) => {
            res.render("categorias/index", {categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug: req.params.slug}).then((categoria) => {
            if(categoria) {
                Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts!")
                })
            } else {
                req.flash("error_msg", "Esta categoria não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria")
            res.redirect("/")	
        })
    })


    app.get("/404", (req,res) => {
        res.send("Erro 404!")
    })

    app.get('/posts', (req, res) => {
        res.send('Lista de posts')
    })

    app.use('/admin', admin)
    app.use('/usuario', usuarios)

//Outros
    const PORT =  process.env.PORT || 8081
    app.listen(PORT, () => {
        console.log('Servidor rodando!!!')
    })