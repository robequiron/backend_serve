/*=================================================================
/  Importaciones                                                    
/*================================================================*/
var express = require('express');
var bcrypt = require ('bcrypt') ; 
var Usuario = require("../models/usuario");
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/*==================================================================
/  Inicialización de variables                                     /
/*================================================================*/
var app = express();


/*===========================================
/  Metodo del login                                
/*=========================================*/
app.post('/', (req,res)=>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err,usuarioDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuario',
                errors: err 
            });
        }
        
        if(!usuarioDB) {
            return res.status(400).json({
                ok:true,
                usuarios: 'Credenciales incorrectas -email',
                body: body,
            });  
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok:true,
                usuarios: 'Credenciales incorrectas -password',
                body: body,
            }); 
        }
        //Crear un TOKEN
        usuarioDB.password = ":)";
        var token = jwt.sign({usuario: usuarioDB},SEED,{expiresIn:14400});

        
        return res.status(200).json({
            ok:true,
            usuarios: usuarioDB,
            token: token,
            id: usuarioDB._id,
            body: body,
        });
    })
});



module.exports = app;