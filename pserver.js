const express = require("express");
const app = express();

app.use(require('express-log-url'));

const logger = require('express-log-url');

const fs = require('fs');
let dataPath = './data/data.json';
let data = require(dataPath)

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.static('public'))


app.post('/users',(req,res) => {
	console.log(req.body);
	fs.writeFile(dataPath,JSON.stringify(req.body),(err) => {
		console.log(err);
	})
	data = req.body;
	res.send("ok");
});

app.get('/data', (req,res) => {
	console.log("Send data request handled.");
  	res.send(JSON.stringify(data));
})

app.get('/', (req,res) => {
	console.log('get request recieved');
	let options = {
	    root: __dirname + '',
	    dotfiles: 'allow',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
  	};
  	let fileName = "index.html";
  	res.sendFile(fileName, options);
})

app.listen(8080)