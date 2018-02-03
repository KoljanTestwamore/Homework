const express = require("express");
const app = express();

app.use(require('express-log-url'));

const logger = require('express-log-url');

const fs = require('fs');
let data = require('./data/data.json')

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.static('public'))


app.post('/users',(req,res) => {
	//res.data = data;	
	console.log(req.body);
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