const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase
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

// Firebase realtime database route GET route
app.get('/database', (req, res) => {
    // TODO: FIGURE OUT HOW TO WAIT FOR testRef.on(); to finish running before
    // running res.send(); ASYNC???


    // Values to send back to React
    var dataValues = new Object();
    console.log("HELLO");

    // Read Database
	var testRef = firebase.database().ref('Users/');
	testRef.on('value', function(snapshot) {
        snapshot.forEach(function(snapshotRef) {
            var name = snapshotRef.val().Name;
            var company = snapshotRef.val().Company;
            dataValues[name] = company;
            console.log(dataValues);
            console.log("Name: ", name);
            console.log("Company: ", company);
            console.log("---------------");
        });
	}, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    console.log("DATA VALUES: " + dataValues);

    // Sending back JSON to React
    res.send({
        "firebase-db-users": dataValues
    });
});
