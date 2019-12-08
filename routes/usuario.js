/*=================================================================
/  Importaciones                                                    
/*================================================================*/
var express = require('express');
var bcrypt = require ('bcrypt') ; 
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');
//Importar esquema de usuarios
var Usuario = require("../models/usuario");

/*==================================================================
/  Inicialización de variables                                     /
/*================================================================*/
var app = express();


/*==================================================================
/  Obtenemos los usuarios                                          /
/*================================================================*/
app.get('/', (req,res,next) => {
    Usuario.find({}, 'nombre email img role')
        .exec(        
            (err,usuarios)=>{
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje: 'Error cargando usuarios',
                    errors: err 
                });
            }
            return res.status(200).json({
                ok:true,
                usuarios: usuarios
            });
    });
});


/*===========================================
/  Crear el usuario                                
/*=========================================*/
app.post('/', mdAutenticacion.verificaToken, (req,res)=>{

    var body = req.body;

    //Hace referencia al modelo de 
    //usuarios creado
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        img: body.img,
        role:body.role
    });

    usuario.save((err,usuarioGuardado)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al crear usuario',
                errors: err 
            });
        }
        return res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
    

});

/*===========================================
/  Actualizar usuario                                
/*=========================================*/
app.put('/:id', mdAutenticacion.verificaToken, (req,res)=>{
    var id= req.params.id;
    var body = req.body;

    Usuario.findById(id, (err,usuario)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar un usuario',
                errors: err 
            });
        }  
        if(!usuario) {
            return res.status(400).json({
                ok:false,
                mensaje: 'El usuario con el id ' + id + 'no existe',
                errors: {message: 'No existe un usuario con ese ID'} 
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.save((error, usuarioGuardado)=>{
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err 
                });
            }  
            return res.status(200).json({
                ok:true,
                usuario: usuarioGuardado
            });
        })
    });

  

});

/*===========================================
/  Borrar usuario                                
/*=========================================*/
app.delete('/:id', mdAutenticacion.verificaToken, (req,res)=>{

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar un usuario',
                errors: err 
            });
        } 
        if(!usuarioBorrado) {
            return res.status(400).json({
                ok:false,
                mensaje: 'No existe el usuario con ese id',
                errors: {message:'No existe usuario con ese id'}
            });        
        }
        return res.status(200).json({
            ok:true,
            usuario: usuarioBorrado
        }); 
    })
});

module.exports =app;