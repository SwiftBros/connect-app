const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var admin = require('firebase-admin');

var serviceAccount = require("./firebase-credentials.json");

var firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://connect-app-cebe4.firebaseio.com"
});


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/database', (req, res) => {
	var testRef = firebase.database().ref('connect-app-cebe4/test');
	testRef.on('value', function(snapshot) {
		console.log("Found value");
	});
});


//var database = firebase.database();


