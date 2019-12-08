var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


/*===========================================
/  Verificar token                                
/*=========================================*/

exports.verificaToken = function(req,res,next)  {
    var token = req.query.token;
    jwt.verify(token, SEED,(err, decode)=>{
        if (err) {
            return res.status(401).json({
                ok:false,
                mensaje: 'Token no valido',
                errors: err 
            });
        } 
        req.usuario = decode.usuario;
        next();
        /* return res.status(200).json({
            ok:true,
            decoded: decode
        }); */
    });
}

