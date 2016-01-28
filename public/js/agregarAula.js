$(document).ready(function() {

	//reglas
	var reglas = {
		numero:{required:true},
        piso:{required:true},
		capacidad:{required:true},
	};
	//mensajes
	var mensajes = {
		numero:{required:" Requerido"},
        piso:{required:" Requerido"},
		capacidad:{required:" Requerido"},
	};

	//Validate
	$("#agregarAulaForm").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarAulaForm").serializeArray();
            console.log(data);
            $.ajax({
                url: '/configAula/agregarAula',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                showAlert("#numero","error","Numero ya existente");
                }else if (data.dato=="ok"){
                showAlert("#enlace","ok","Aula añadida correctamente");
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            /*
            *   Form Submit Fin
            */
        }//submitHandler
    });//Validate
});//ready


function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                });
    }