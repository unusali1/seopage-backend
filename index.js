const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { ObjectID, ObjectId } = require("bson");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://unus:unus12@cluster0.nedncct.mongodb.net/seopage?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client.connect((err) => {
	const dataCollection = client
		.db(`${process.env.DB_NAME}`)
		.collection("files");


	app.post("/add-files", (req, res) => {
		const newFile = req.body;
		dataCollection.insertOne(newFile).then((result) => {
			res.send(result.insertedCount > 0);
		});
	});

	app.get("/all-files", (req, res) => {
		dataCollection.find().toArray((err, files) => {
			res.send(files);
		});
	});

});


app.get("/", (req, res) => {
	res.send("Welcome to SEOPage 1 Server API");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
