var express = require('express');
var router = express.Router();
var aula = require('../models/aula');
var horario_profesor = require('../models/horario_profesor');
var horario_grupo = require('../models/horario_grupo');
var profesor = require('../models/profesor');
var asignatura = require('../models/asignatura');
var grupo = require('../models/grupo');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('config', { title: 'Configuracion' });
});*/

router.get('/', function(req, res, next) { 
        aula.buscarTodosLosIdYNumero(function (error,data){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);
                      //console.log(data.length);                
                      //res.send(data);
                      res.render('config',{ 
                      aula:data,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreGrupo
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.get('/configFaltas/modificarFalta', function(req, res, next) {
  res.render('modificarFalta', { title: 'modificarFalta' });
});

router.get('/configPersonas', function(req, res, next) {
  res.render('configPersonas', { title: 'configPersonas' });
});

router.get('/configPersonas/agregarAlumno', function(req, res, next) {
  res.render('agregarAlumno', { title: 'agregarAlumno' });
});

router.get('/configPersonas/agregarProfesor', function(req, res, next) {
  res.render('agregarProfesor', { title: 'agregarProfesor' });
});

router.get('/configPersonas/modificarAlumno', function(req, res, next) {
  res.render('modificarAlumno', { title: 'modificarAlumno' });
});

router.get('/configPersonas/modificarProfesor', function(req, res, next) {
  res.render('modificarProfesor', { title: 'modificarProfesor' });
});

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
client.on('connect', function () {
  client.subscribe('dispositivosArduino');
  client.publish('dispositivosArduino', 'status');
});
router.get('/configDispositivos', function(req, res, next) {
  var io = req.app.io;
  io.on('connection',function (socket) {
    socket.on('dispositivos', function(msg){
      console.log(msg);
    });
  })//io

  res.render('configDispositivos', { title: 'configDispositivos' });
});

router.get('/configGlobal', function(req, res, next) {
  res.render('configGlobal', { title: 'configGlobal' });
});

router.get('/configGlobal/configAulas', function(req, res, next) {
  res.render('configAulas', { title: 'configAulas' });
});

router.get('/configGlobal/configAulas/agregarAula', function(req, res, next) {
  res.render('agregarAula', { title: 'agregarAula' });
});

router.get('/configGlobal/configAulas/modificarAula', function(req, res, next) {
  res.render('modificarAula', { title: 'modificarAula' });
});

router.get('/configGlobal/configGrupos', function(req, res, next) {
  res.render('configGrupos', { title: 'configGrupos' });
});

router.get('/configGlobal/configGrupos/agregarGrupo', function(req, res, next) {
  res.render('agregarGrupo', { title: 'agregarGrupo' });
});

router.get('/configGlobal/configGrupos/modificarGrupo', function(req, res, next) {
  res.render('modificarGrupo', { title: 'modificarGrupo' });
});

router.get('/configGlobal/configAsignaturas', function(req, res, next) {
  res.render('configAsignaturas', { title: 'configAsignaturas' });
});

router.get('/configGlobal/configAsignaturas/agregarAsignatura', function(req, res, next) {
  res.render('agregarAsignatura', { title: 'agregarAsignatura' });
});

router.get('/configGlobal/configAsignaturas/modificarAsignatura', function(req, res, next) {
  res.render('modificarAsignatura', { title: 'modificarAsignatura' });
});

router.get('/configGlobal/configHorario', function(req, res, next) {
  res.render('configHorario', { title: 'configHorario' });
});

router.get('/configGlobal/configHorario/agregarHorarioGrupo', function(req, res, next) {
  aula.buscarTodosLosIdYNumero(function (error,aul) {
    if (error) {
      console.log("Fallo buscarTodosLosIdYNumero");
      throw error;
    }else{  
    asignatura.buscarTodasLasAsignaturas(function (error,asign) {
      if (error) {
        console.log("Fallo buscarTodasLasAsignaturas");
        throw error;
      }else{
        grupo.buscarTodosLosIdYNombreGrupo(function (error,gru){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioGrupo',{ 
                      grupo:gru,
                      asignatura:asign,
                      aula:aul,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreGrupo
      }//.else
    });//profesor.buscarProfesorPorId
  }//.else
  });//.buscarTodosLosIdYNumero
});

router.get('/configGlobal/configHorario/modificarHorarioGrupo', function(req, res, next) {
  res.render('modificarHorarioGrupo', { title: 'modificarHorarioGrupo' });
});

router.get('/configGlobal/configHorario/agregarHorarioProfesor', function(req, res, next) {
    horario_grupo.buscarTodosLosHorarioGrupo(function (error,gru) {
    if (error) {
      console.log("Fallo buscarTodosLosHorarioGrupo");
      throw error;
    }else{  
        profesor.mostrarTodosLosIdNombreApellidosProfesor(function (error,pro){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioProfesor',{ 
                      grupo:gru,
                      profesor:pro,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreApellidosProfesor
  }//.else
  });//.buscarTodosLosHorarioGrupo
});

router.get('/configGlobal/configHorario/modificarHorarioProfesor', function(req, res, next) {
  res.render('modificarHorarioProfesor', { title: 'modificarHorarioProfesor' });
});

router.get('/configGlobal/configApariencia', function(req, res, next) {
  res.render('configApariencia', { title: 'configApariencia' });
});

router.get('/configGlobal/configBasedeDatos', function(req, res, next) {
  res.render('configBasedeDatos', { title: 'configBasedeDatos' });
});

module.exports = router;
