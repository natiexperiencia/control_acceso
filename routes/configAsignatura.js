var express = require('express');
var router = express.Router();
var asignatura = require('../models/asignatura');
var profesor = require('../models/profesor');

/***********************************************************INSERT***********************************************************/

/*
* INSERT asignatura
*/
router.post('/configAsignatura/agregarAsignatura', function(req,res,next){
	console.log(req.body);
	var nombre = req.body.nombre;
  	var clave = req.body.clave;
  	var tipo = req.body.tipo;
  	var obligatoria = req.body.obligatoria;
  
  	asignatura.buscarAsignaturaPorClave(clave, function (error,row) {
	  	if (error) {
	    	res.send({err:'bd'});
	    	throw error;
	  	}else{
	    	if(row.length>0){
	    		res.send({err:'existe'});
	    	}else{
	    		asignatura.agregarAsignatura(nombre,clave,obligatoria,tipo, function (error,row) {
	        		if (error) {
	        			res.send({err:'bd'});
	          			throw error;
	        		}else{
	        			res.send(row);
	        		}//else
	      		});//asignatura.agregarAsignatura
	    	}//else
	    }//else
	});//asignatura.buscarAsignaturaPorClave
});//router.post('/agregarAsignatura

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE asignatura
*/
router.post('/configAsignatura/modificarAsignatura',  function(req,res,next){
    var id_asignatura = req.body.id_asignatura;
    var nombre = req.body.nombre;
    var clave = req.body.clave;
    var obligatoria = req.body.obligatoria;
    var tipo = req.body.tipo;
    
    asignatura.buscarAsignaturaPorIdYClave(id_asignatura,clave, function (error,row) {
        if (error) {
            res.send({err:'bd'});
            throw error;
        }else{
            if (row.length>0){
                asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{ 
                        res.send(row);
                    }//else
                });//asignatura.modificarAsigntura
            }else {
                asignatura.buscarAsignaturaPorClave(clave, function (error,row) {
                    if (error) {
                        res.send({err:'bd'});
                        throw error;
                    }else{
                        if (row.length>0){
                            res.send({err:'existe'});
                        }else {
                            asignatura.modificarAsigntura(id_asignatura,nombre,clave,obligatoria,tipo, function(error,row) {
                                if (error) {
                                    res.send({err:'bd'});
                                    throw error;
                                }else{ 
                                    res.send(row);
                                }//else
                            });//asignatura.modificarAsigntura
                        }//else
                    }//else
                });//asignatura.buscarAsignaturaPorClave
            }//else
        }//else
    });//asignatura.buscarAsignaturaPorIdYClave
});//router.post('/modificarAsignatura

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura
*/
router.post('/configAsignatura/borrarAsignatura', function(req,res,next){
    var id_asignatura = req.body.id_asignatura;
    asignatura.borrarAsigntura(id_asignatura, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//asignatura.borrarAsigntura
});//router.post('/borrarAsignatura

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR asignaturas que imparte un profesor por id_profesor
*/
router.post('/configAsignatura/buscarAsignaturasQueImparte', function(req,res,next) {
    var id_profesor = req.body.id_profesor;
    profesor.buscarAsignaturasQueImparte(id_profesor,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//profesor.buscarAsignaturasQueImparte
});//router.post('/buscarAsignaturasQueImparte

/*
* BUSCAR asignaturas que NO imparte un profesor por id_profesor
*/
router.post('/configAsignatura/buscarAsignaturasQueNoImparte', function(req,res,next) {
    var id_profesor = req.body.id_profesor;
    profesor.buscarAsignaturasQueNoImparte(id_profesor,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//profesor.buscarAsignaturasQueNoImparte
});//router.post('/buscarTodasLasAsignaturas

/*
* BUSCAR asignaturas que NO imparte un profesor por tipo
*/
router.post('/configAsignatura/buscarTodasLasAsignaturasDelTipo', function(req,res,next) {
    var id_profesor = req.body.id_profesor;
    var tipo = req.body.tipo;
    profesor.buscarAsignaturasQueNoImparteSegunElTipo(id_profesor,tipo,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//profesor.buscarAsignaturasQueNoImparteSegunElTipo
});//router.post('/buscarTodasLasAsignaturasDelTipo

/*
* BUSCAR asignaturas por nombre
*/
router.post('/configAsignatura/buscarAsignaturaNombre', function(req,res,next) {
    var nombre = req.body.nombre;
    asignatura.buscarAsignaturaPorNombre(nombre, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//asignatura.buscarAsignaturaPorNombre
});//router.post('/buscarAsignaturaNombre

/*
* BUSCAR asignaturas por id_asignatura
*/
router.post('/configAsignatura/buscarAsignaturaPorId', function(req,res,next) {
    var id_asignatura = req.body.id_asignatura;
    asignatura.buscarAsignaturaPorId(id_asignatura, function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//asignatura.buscarAsignaturaPorId
});//router.post('/buscarAsignaturaPorId

/*
* BUSCAR todas las asignaturas
*/
router.post('/configAsignatura/buscarTodasLasAsignaturas', function(req,res,next){
    asignatura.buscarTodasLasAsignaturas(function(error,row) {
        if (error) {
            throw error;
        }else{
            console.log(row);
            res.send(row);
        }//else
    })//asignatura.buscarTodasLasAsignaturas
});//router.post('/buscarTodasLasAsignaturas

router.post('/configAsignatura/buscarTodasLasAsignaturasQueNoImparte', function(req,res,next) {
    var id_profesor = req.body.id_profesor;
    profesor.buscarAsignaturasQueNoImparte(id_profesor,function(error,row) {
        if (error) {
            throw error;
        }else{
            res.send(row);
        }//else
    })//profesor.buscarAsignaturasQueNoImparteSegunElTipo
});//router.post('/buscarTodasLasAsignaturasDelTipo


/****************************************************************************************************************************/

module.exports = router;