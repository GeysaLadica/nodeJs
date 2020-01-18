const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes') //importar rotas. Se "routes.js" ele irá tentar encontrar um pacote.Necessário passar caminho relativo "./" para arq na mesma pasta

const app = express();

mongoose.connect('mongodb+srv://user:senha@cluster0-qpawr.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,  
});

app.use(express.json());
app.use(routes); //para usar rotas importadas


app.listen(3333);