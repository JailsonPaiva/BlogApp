if(process.env.NODE_ENV == "production") {
	module.exports = {mongoURI: "mongodb+srv://jailson_admin:admin123@cluster0.sy9ps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}
} else {
	module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}
