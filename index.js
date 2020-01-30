const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const cors = require('cors');

app.use(cors());

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})