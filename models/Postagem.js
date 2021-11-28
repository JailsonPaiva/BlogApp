const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Postagem = new Schema({
	titulo: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	conteudo: {
		type: String,
		required: true
	},
	categoria: {
		type: Schema.Types.ObjectId, // aqui o campo categoria estar armazenando o ID de um categoria já criada
		ref: "Categoria", // Aqui indica qual o model ele vai buscar esse ID
		required: true
	},
	data: {
		type: Date,
		default: Date.now()
	}
})

mongoose.model("Postagem",Postagem)