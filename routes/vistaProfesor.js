var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');

/* GET vista del profesor page. */
router.get('/', function(req, res, next) {
	var curr_time;
	if (req.query.time == undefined) {
		time.horaActual(function (error,data) {
			if (error) {
				throw error;
			}else{
				curr_time = data;
				console.log(curr_time);
			}//.else
		});//.time.horaActual
	}else{
		curr_time = req.query.time;
	}//.else
	profesor.buscarProfesorPorId(req.query.idProfesor, function (error,nombre,foto,correo) {
		if (error) {
			console.log("Fallo buscarProfesorPorId");
			throw error;
		}else{
			profesor.losAlumnosDeSuClaseActual(req.query.idProfesor,curr_time,function (error,idArray,nombreArray,apellidosArray,fotoArray){
									if (error) {
										console.log("Fallo");
										throw error;
									}else{
										//console.log(data);
										//res.send(data);
										res.render("vistaProfesor",{ 
										name : nombre, 
										image: foto,
										correo:correo,
										id:idArray,
										nombre: nombreArray,
										apellidos: apellidosArray,
										foto: fotoArray,
										})//.res.render
									}//else error
			});////.profesor.losAlumnosDeSuClaseActual
		}//.else
	});//profesor.buscarProfesorPorId
});//.router.get('/', function(req, res, next) {

/*
*	devuelve json horario profesor segun correo
*/
router.get('/horarioProfesor', function(req,res,next) {
	var correo = req.query.correo;
	profesor.horarioProfesorCompleto(correo, function(error,row) {
		if (error) {
			throw error;
		}else{
			res.send(row);
		}
	})//horarioProfesorCompleto
});//get /horarioProfesor

module.exports = router;