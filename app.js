//Require
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Importar rutas
var appRoutes = require('./routes/app');
var usuariosRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Iniciar variables
var app= express();

/*===========================================
/  BodyParse                                
/*=========================================*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

//Escuchar peticiones
app.listen(3000, ()=>{
    console.log('Express server puerto \x1b[32m3000 \x1b[0m');
});


app.use('/usuario',usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/',appRoutes);


//Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err,res)=>{
    if (err) throw err; //Si existe error detiene el proceso.
    console.log ('Base de datos\x1b[32m online \x1b[0m');
});

