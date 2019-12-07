//Require
var express = require('express');
var mongoose = require('mongoose');

//Inicializar variables
var app= express();

//Escuchar peticiones
app.listen(3000, ()=>{
    console.log('Express server puerto \x1b[32m3000 \x1b[0m');
});

//Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err,res)=>{
    if (err) throw err; //Si existe error detiene el proceso.
    console.log ('Base de datos\x1b[32m online \x1b[0m');
});

//Rutas
app.get('/', (req, res, next) => {

    res.status(400).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    })

});