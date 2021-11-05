//METODOS GET POST PUT Y DELETE DE LA TABLA SALONES AS PARTYROOM
function Cargar(){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta);
			$("#TablaP").empty();
			var Tablaprin = '<table id= "customers">';
			Tablaprin += '<thead>'
			Tablaprin += '<tr>';
			Tablaprin += '<th> ID </th>';
			Tablaprin += '<th> PROPIETARIO </th>';
			Tablaprin += '<th> CAPACIDAD </th>';
			Tablaprin += '<th> CATEGORIA </th>';
			Tablaprin += '<th> NOMBRE </th>';
			Tablaprin += '</tr>';
			Tablaprin += '</thead>';
			for (i=0; i<respuesta.items.length; i++){
				Tablaprin += '<tbody>';
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta.items[i].id+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].owner+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].capacity+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].category_id+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].name+ '</td>'; 
				Tablaprin += '<td><button onclick="editarRegistro('+respuesta.items[i].id+')">Detalle</button>';
				Tablaprin += '<td><button onclick="eliminar('+respuesta.items[i].id+')">Eliminar</button>';	
				Tablaprin += '</tr>';	
				Tablaprin += '</tbody>';
			}
			Tablaprin += '</table>';
			$("#TablaP").append(Tablaprin);
		},
	});
}

function ingresarDatos(){
	var datos={
		id:$("#id").val(),
		owner:$("#owner").val(),
		capacity:$("#capacity").val(),
		category_id:$("#category_id").val(),
		name:$("#name").val()
	};
	if (datos.id=='' || datos.owner=='' || datos.capacity=='' || datos.category_id=='' || datos.name==''){
		alert("Todos los campos son obligatorios");
	}	
	else{
	let datosJson=JSON.stringify(datos);
	$.ajax({
	url:'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	data:datosJson,
	type:'POST',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	statusCode: {
		201: function () {
			alert("La sala se agrego exitosamente");
			Cargar();
		},
		555: function(){
			validarexistenciaS(datos.id);
		}
	}
	
});
limpiarCampos()
}}
function editarRegistro (id){
	$.ajax({    
    url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    success : function(respuesta) {
		console.log(respuesta); 
			$("#id").val(respuesta.items[0].id);
			$("#owner").val(respuesta.items[0].owner);
			$("#capacity").val(respuesta.items[0].capacity);
			$("#category_id").val(respuesta.items[0].category_id);
			$("#name").val(respuesta.items[0].name);
			$("#id").attr('disabled', true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}
function actualizar(){
	var datos={
		id:$("#id").val(),
		owner:$("#owner").val(),
		capacity:$("#capacity").val(),
		category_id:$("#category_id").val(),
		name:$("#name").val()
	};
	if (datos.id=='' || datos.owner=='' || datos.capacity=='' || datos.category_id=='' || datos.name==''){
		alert("Todos los campos son obligatorios");
	}


	
	else{
	let datosJson = JSON.stringify(datos); 
	$.ajax(    
    'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    
    statusCode : {
		
		201 :  function() {
			alert("La sala se actualizo exitosamente");
			$("#id").attr('disabled', false);
        	Cargar();	
			}
		}
	});
	limpiarCampos()
}}
function eliminar(principal){
	
	let misDatos = {
        id: principal
    };
    let datosJson = JSON.stringify(misDatos);
    $.ajax(
        'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
        {
            data: datosJson,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            statusCode: {
                204: function () {
                    alert("La sala se elimino exitosamente!");
					Cargar();
                }
            }
        });}
function limpiarCampos(){
        $("#id").val(''),
        $("#owner").val(''),
        $("#capacity").val(''),
        $("#category_id").val(''),
        $("#name").val('')
}
function besbloquearM(){
	$("#id").attr('disabled', false);
	$("#messagetext").attr('disabled', false);
	limpiarCamposM();
}
//METODOS GET POST PUT Y DELETE DE LA TABLA CLIENTES
function CargarC(){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta);
			$("#TablaC").empty();
			var Tablaprin = '<table id= "customers">';
			Tablaprin += '<thead>'
			Tablaprin += '<tr>';
			Tablaprin += '<th> ID </th>';
			Tablaprin += '<th> NOMBRE </th>';
			Tablaprin += '<th> CORREO </th>';
			Tablaprin += '<th> EDAD </th>';
			Tablaprin += '</tr>';
			Tablaprin += '</thead>';
			for (i=0; i<respuesta.items.length; i++){
				Tablaprin += '<tbody>';
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta.items[i].id+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].name+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].email+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].age+ '</td>'; 		 
				Tablaprin += '<td><button onclick="editarRegistroC('+respuesta.items[i].id+')">Detalle</button>';
				Tablaprin += '<td><button onclick="eliminarC('+respuesta.items[i].id+')">Eliminar</button>';	
				Tablaprin += '</tr>';	
				Tablaprin += '</tbody>';
			}
			Tablaprin += '</table>';
			$("#TablaC").append(Tablaprin);
		},
	});
}
function ingresarDatosC(){
	var datos={
		id:$("#id").val(),
		name:$("#name").val(),
		email:$("#email").val(),
		age:$("#age").val(),
	};
	if (datos.id=='' || datos.name=='' || datos.email=='' || datos.age==''){
		alert("Todos los campos son obligatorios");
	}
	else{
	let datosJson=JSON.stringify(datos);
	$.ajax({
	url:'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
	data:datosJson,
	type:'POST',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	statusCode: {
		201: function () {
			alert("El cliente se agrego exitosamente");
			CargarC();	
		},
		555: function(){
			validarexistenciaC(datos.id);
		}}
});
limpiarCamposC()
}}
function editarRegistroC(id){
	$.ajax({    
    url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    success : function(respuesta) {
		console.log(respuesta); 
			$("#id").val(respuesta.items[0].id);
			$("#name").val(respuesta.items[0].name);
			$("#email").val(respuesta.items[0].email);
			$("#age").val(respuesta.items[0].age);
			$("#id").attr('disabled', true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}
function actualizarC(){
	var datos={
		id:$("#id").val(),
		name:$("#name").val(),
		email:$("#email").val(),
		age:$("#age").val(),
	};
	if (datos.id=='' || datos.name=='' || datos.email=='' || datos.age==''){
		alert("Todos los campos son obligatorios");
	}
	else{
	let datosJson = JSON.stringify(datos); 
	$.ajax(    
    'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    
    statusCode : {
		
		201 :  function() {
			alert("El cliente se actualizo exitosamente");
			$("#id").attr('disabled', false);
        	CargarC();	
			}
		}
	});
	limpiarCamposC()
}}
function eliminarC(principal){
	
	let misDatos = {
        id: principal
    };
    let datosJson = JSON.stringify(misDatos);
    $.ajax(
        'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
        {
            data: datosJson,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            statusCode: {
                204: function () {
                    alert("El cliente se elimino con exito");
					CargarC();
                }
            }
        });}
function limpiarCamposC(){
        $("#id").val(''),
        $("#name").val(''),
        $("#email").val(''),
        $("#age").val('')
}
function besbloquearC(){
	$("#id").attr('disabled', false);
}
//METODOS GET POST PUT Y DELETE DE LA TABLA MENSAJES
function CargarM(){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta);
			$("#TablaM").empty();
			var Tablaprin = '<table id= "customers">';
			Tablaprin += '<thead>'
			Tablaprin += '<tr>';
			Tablaprin += '<th> ID </th>';
			Tablaprin += '<th> MENSAJE </th>';
			Tablaprin += '</tr>';
			Tablaprin += '</thead>';
			for (i=0; i<respuesta.items.length; i++){
				Tablaprin += '<tbody>';
				Tablaprin += '<tr>';
				Tablaprin += '<td>'+ respuesta.items[i].id+ '</td>'; 		
				Tablaprin += '<td>'+ respuesta.items[i].messagetext+ '</td>'; 				 
				Tablaprin += '<td><button onclick="editarRegistroM('+respuesta.items[i].id+')">Detalle</button>';
				Tablaprin += '<td><button onclick="eliminarM('+respuesta.items[i].id+')">Eliminar</button>';	
				Tablaprin += '</tr>';	
				Tablaprin += '</tbody>';
			}
			Tablaprin += '</table>';
			$("#TablaM").append(Tablaprin);
		},
	});
}
function ingresarDatosM(){
	var datos={
		id:$("#id").val(),
		messagetext:$("#messagetext").val(),
	};
	if (datos.id=='' || datos.messagetext==''){
		alert("Todos los campos son obligatorios");
	}
	else{
	let datosJson=JSON.stringify(datos);
	$.ajax({
	url:'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
	data:datosJson,
	type:'POST',
	dataType: 'json',
	contentType: "application/json; charset=utf-8",
	statusCode: {
		201: function () {
			alert("El mensaje se agrego exitosamente");
			CargarM();	
		},
		555: function(){
			validarexistenciaM(datos.id);
		}}
});
limpiarCamposM()
}}
function editarRegistroM(id){
	$.ajax({    
    url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    success : function(respuesta) {
		console.log(respuesta); 
			$("#id").val(respuesta.items[0].id);
			$("#messagetext").val(respuesta.items[0].messagetext);
			$("#id").attr('disabled', true);
			$("#messagetext").attr('disabled', true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}
function actualizarM(){
	var datos={
		id:$("#id").val(),
		messagetext:$("#messagetext").val(),
	};
	if (datos.id=='' || datos.messagetext==''){
		alert("Todos los campos son obligatorios");
	}
	else{
	let datosJson = JSON.stringify(datos); 
	$.ajax(    
    'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
    
    statusCode : {
		
		201 :  function() {
			alert("El mensaje se actualizo exitosamente");
			$("#id").attr('disabled', false);
			$("#messagetext").attr('disabled', false);
        	CargarM();	
			}
		}
	});
	limpiarCamposM()
}}
function eliminarM(principal){
	
	let misDatos = {
        id: principal
    };
    let datosJson = JSON.stringify(misDatos);
    $.ajax(
        'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        {
            data: datosJson,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            statusCode: {
                204: function () {
                    alert("El mensaje se elimino exitosamente!");
					CargarM();
                }
            }
        });}
function limpiarCamposM(){
    $("#id").val(''),
    $("#messagetext").val('')
}
function besbloquearM(){
	$("#id").attr('disabled', false);
	$("#messagetext").attr('disabled', false);
	limpiarCamposM();
}

function validarexistenciaS(id){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/'+id,
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			console.log(respuesta);	
			if(respuesta.items[0].id==id)
				alert("La llave ya existe")
		},
	});
}
function validarexistenciaC(id){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/'+id,
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			console.log(respuesta);	
			if(respuesta.items[0].id==id)
				alert("La llave ya existe")
		},
	});
}
function validarexistenciaM(id){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/'+id,
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			console.log(respuesta);	
			if(respuesta.items[0].id==id)
				alert("La llave ya existe")
		},
	});
}
/*function saberS(id){
	$.ajax({    
		url : 'https://g152002af43c633-retosmintic.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/partyroom/'+id,
		data: "{}",
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
		success : function(respuesta) {
			console.log(respuesta)
			if(respuesta.items[0].id == id){
				
			}
			else{
				alert("La llave NO existe")
			}
		}
	});
}*/
