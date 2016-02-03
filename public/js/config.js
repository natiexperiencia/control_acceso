$(document).ready(function() {
    $( "div" ).click(function() {
      //alert($(this).attr("id"));
      event.preventDefault();
			$.ajax({
				url: '/configProfesor/buscarProfesorPorIdAulaEnUnaHora',
				type: 'post',
				dataType: 'html',
				data: {'id_aula':$(this).attr("id")},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log(data);
				if (data == "[]"){
					console.log("error");
					showAlert("#titulo","error","No hay clase a esta hora");
				} else {
					var JSONObject = JSON.parse(data);
					console.log("success");
					window.location.replace('/vistaProfesor?idProfesor='+JSONObject[0].id_profesor);
				}

			})//done
			.fail(function() {
				console.log("error");
			})//fail
	});//$( "div" ).click(function()
});//ready


function showAlert(lugar,tipo,texto) {
	
    $('#mensaje').attr('class','alert alert-danger fade in');
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                });
    }

