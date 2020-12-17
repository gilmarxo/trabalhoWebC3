const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbPath = 'mongodb://localhost/projetodevWebII'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('DB conectado!');
}).catch(error => console.error(error.message));

const port = process.env.PORT || 8080;
const hostname = 'localhost';


app.get('/', (req, res) => {
    res.send('Servidor Conectado!');
});

app.use('/api', routes);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: http://${hostname}:${port}`);
})