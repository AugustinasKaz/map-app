const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require("body-parser");
const { Client } = require('pg');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const DATABASE_URL = 'postgres://xgemsdtxhdbdmf:b16715f5b5a2d2be9f8ab5c034d6f9c410c80f0652987c186ad5e9a88740e565@ec2-34-193-42-173.compute-1.amazonaws.com:5432/ddt0bch2hsg32t'

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

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})