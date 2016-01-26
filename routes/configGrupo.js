var express = require('express');
var router = express.Router();
var grupo = require('../models/grupo');
var multer = require('multer');

/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarGruposdelAlumno', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  grupo.buscarGrupoDelAlumno(id_alumno,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarGrupoDelAlumno
});//.

router.post('/buscarTodosLosGrupos', function(req,res,next) {
  var id_alumno = req.body.id_alumno;
  grupo.losGruposQueFaltan(id_alumno,function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//losGruposQueFaltan
});//router.post('/buscarTodosLosGrupos', function(req,res,next) {

/*
* devuelve el id del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarAsignaturasDelGrupo', function(req,res,next) {
  var id_grupo = req.body.id_grupo;
  grupo.mostrarTodasLasAsignaturasDeUnGrupo(id_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/* POST agregar grupo page. */
router.post('/agregarGrupo', function(req,res,next){
  var nombre = req.body.nombre;
  var tipo = req.body.tipo;
    grupo.buscarGrupoPorNombre(nombre, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          grupo.insertarGrupo(nombre,tipo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.grupo.insertarGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.grupo.buscarGrupoPorNombre
});//.router.post('/agregarGrupo', function(req,res,next){

router.post('/updateGrupo',  function(req,res,next){
    var id_grupo = req.body.id_grupo;
    var nombre = req.body.nombre;
    var tipo = req.body.tipo;
          grupo.buscarGrupoPorIdNombre(id_grupo,nombre, function (error,row) {
            if (error) {
              res.send({err:'bd'});
              throw error;
            } else{
                if (row.length>0){
                     grupo.modificarGrupo(id_grupo,nombre,tipo, function(error,row) {
                          if (error) {
                            res.send({err:'bd'});
                            throw error;
                          } else{ 
                            res.send(row);
                          }//.else
                      });//.asignatura.agregarAsignatura
                } else {
               grupo.buscarGrupoPorNombre(nombre, function (error,row) {
                  if (error) {
                    res.send({err:'bd'});
                    throw error;
                  } else{
                    //console.log(row);
                      if (row.length>0){
                       // res.render('agregarAsignatura', { title: 'agregarAsignatura', info: 'Clave existente'}); 
                       res.send({err:'existe'});
                      } else {
                  grupo.modificarGrupo(id_grupo,nombre,tipo, function(error,row) {
                    if (error) {
                      res.send({err:'bd'});
                      throw error;
                    } else{ 
                      res.send(row);
                    }//.else
                  });//.grupo.modificarGrupo
                    }//.else
                  }//.else
                });//.grupo.buscarGrupoPorNombre
        }//. else
    }//.else
  });//.grupo.buscarGrupoPorIdNombre
});//router.post('/modificarAsignatura',  function(req,res,next){

router.post('/buscarGrupoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  grupo.buscarGrupoPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorNombre
});//router.post('/buscarGrupoNombre', function(req,res,next) {

router.post('/buscarGrupoPorId', function(req,res,next) {
  var id_grupo = req.body.id_grupo;
  grupo.buscarGrupoPorId(id_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarGrupo', function(req,res,next){
  var id_grupo = req.body.id_grupo;
  grupo.borrarGrupo(id_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){  

router.post('/mostrarTodosLosGruposIdNombre', function(req,res,next){
  grupo.mostrarTodosLosIdNombreGrupo(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.grupo.mostrarTodosLosIdNombreGrupo
});//.router.post('/mostrarTodosLosGruposIdNombre', function(req,res,next){

module.exports = router;