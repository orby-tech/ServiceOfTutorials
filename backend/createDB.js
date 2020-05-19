var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";
myobj = {catalog: [["Front-end", ['React', []]
                              ]]}
myobj1 = {name: "11111111111", article: "<p>New Article</p>"}                              
	MongoClient.connect(urldb)
		.then((db) => db.db("tutorialsdb"))
		.then((dbo) => {
			dbo.createCollection("allcatalog")
			dbo.createCollection("tutorials")
			dbo.collection("allcatalog").insertOne(myobj)
			dbo.collection("tutorials").insertOne(myobj1)
		})
		.catch((err) => { console.log(err, "err")})
		.then((result) => {
			console.log(result)
			})

