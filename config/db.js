if(process.env.NODE_ENV == "production") {
	module.exports = {mongoURI: "mongodb+srv://jailson_admin:admin123@cluster0.sy9ps.mongodb.net/cluster0-shard-00-02.sy9ps.mongodb.net:27017?retryWrites=true&w=majority"}
} else {
	module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}