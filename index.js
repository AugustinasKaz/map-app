const express = require('express');
const app = express();
const path = require('path');
//const cors = require('cors');
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const { Client } = require('pg');


app.use(express.static(path.join(__dirname, 'react-map/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

const DATABASE_URL = 'postgres://yrmojtsjkkgcfa:e271eccf69f35debd2922b46d90d32dc6ffda1fd2539e792a477755aceac9d31@ec2-34-203-32-44.compute-1.amazonaws.com:5432/d6uptu974fpefd'

app.post('/api/addUser', (req, res) => {
    let user = req.body.user;
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("INSERT INTO users(username)VALUES('"+user+"');", (err, response) => {
        if (err)
            res.json(err);
        else 
            res.json(response);
    })
})

app.post('/api/addUserCity', (req, res) => {
    let user = req.body.user;
    let city = req.body.city;
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("UPDATE users SET favorite_cities = array_append(favorite_cities,'"+city+"') WHERE username = '"+user+"';", (err, response) => {
        if (err)
            res.json(err);
        else 
            res.json(response);
    })
})

app.post('/api/getUsersCities', (req, res) => {
    let user = req.body.user;
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("SELECT favorite_cities FROM users WHERE username = '"+user+"';", (err, response) => {
        if (err)
            res.json(err);
        else 
            res.json(response.rows[0]);
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/react-map/build/index.html'));
});

app.listen(port, () => console.log(`app listening on port ${port}!`))