const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("Categoria")

router.get('/', (req, res) => {
	// res.send('Pagina principal do painel ADM')
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
	res.send('Página de posts')
})

router.get("/categorias", (req, res) => {
	Categoria.find().lean().sort({date: "desc"}).then((categorias) => {
		res.render("admin/categorias", {categorias: categorias})
	}).catch((err) => {
		req.flash("erro_msg", "Ocorreu um erro ao listar as categorias.")
		res.redirect("/admin")
	})
})

router.get("/categorias/add", (req, res) => {
	res.render("admin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {

	var erros = []

	if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
		erros.push({texto: "Nome da categoria inválido"})
	}

	if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
		erros.push({texto: "Slug inválido"})
	}

	if(req.body.nome.length < 2) {
		erros.push({texto: "Nome da categoria é muito pequeno"})
	}

	if(erros.length > 0) {
		res.render("admin/addcategorias", {erros: erros})
	}else {

		const novaCategoria = {
			nome: req.body.nome,
			slug: req.body.slug
		}
		new Categoria(novaCategoria).save().then( () => {
			req.flash("success_msg", "Categoria cadastrada com sucesso!")
			res.redirect("/admin/categorias")
		}).catch( (err) => {
			req.flash("error_msg", "Ocoreu um erro ao cadastrar a categoria, tente novamente!")
			res.redirect("/admin")
		})

	}
	
})

// router.get('/categorias', (req, res) => {
// 	res.send('Página de categorias')
// })
module.exports = router