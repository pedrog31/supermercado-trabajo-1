$(document).ready(function(){
	var AWS = require('aws-sdk');
	var nombre = sessionStorage.getItem("Nombre");
	var rol = sessionStorage.getItem("Rol");
	/**if (nombre == null || rol == null || rol != "vendedor"){
		alert("Debe loguearse como vendedor para poder acceder a esta página.");
		window.location="login.html";
	}else**/
		$("#user").html('<i class="fa fa-fw fa-user"></i> Conectado como '+ nombre + ' - Vendedor');
		$.ajax({
	crossDomain: true,
	type: 'GET',
    url: 'https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/compradores',
    contentType: 'application/json; charset=utf-8',
	datatype: 'jsonp',
    success: function (data) {
		var code ='<div class="table-responsive">'
				+ '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">'
				+  '<thead>'
				+    '<tr>'
				+      '<th>Documento</th>'
				+      '<th>Nº documento</th>'
				+      '<th>Nombre</th>'
				+      '<th>¿Descuento?</th>'
				+    '</tr>'
				+  '</thead>'
				+  '<tbody>';

		for (i = 0; i < data.length; i++) {
			code = code + '<tr>'
						+	 '<td align="center">' + data[i].tipo_identificacion + '</td>'
						+	 '<td align="center">' + data[i].identificacion + '</td>'
						+    '<td align="center">' + data[i].nombre_completo + '</td>';
			if (data[i].descuento == true)
				code = code + '<td align="center"> Si </td>';
			else
				code = code + '<td align="center" class="dropdown">'
							+ '<button id =' + i + ' type="button" onclick="generarCupon();" class="btn btn-default">Agregar cupon</button>'
							+ '</td>';
		}
		code = code + '</tr></tbody> </table> </div>';
		$("#table").html(code);
	},
    error: function (x, y, z) {
        alert("Error: "+x.responseText +"  " +x.status);
    }
});
	}
});


function generarCupon() {
	var albumBucketName = 'ingenieriaweb';
		var bucketRegion = 'us-east-2';
		var IdentityPoolId = 'us-east-2:5b6537cc-18fd-4e5b-8f04-d23e962ea7f7';

		AWS.config.update({
			region: bucketRegion,
			credentials: new AWS.CognitoIdentityCredentials({
				IdentityPoolId: IdentityPoolId
			})
		});

		var s3 = new AWS.S3({
			apiVersion: '2006-03-01',
			params: {Bucket: albumBucketName}
		});
		var AWS = require("aws-sdk");
		var xhr = new XMLHttpRequest();
		var url = "https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/compradores";
		xhr.open("POST", url, true);
		xhr.setRequestHeader( 'Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token');
		var comprador = {
			"tipo_identificacion": "CC",
  			"identificacion": "10293456"
		};
		var data = JSON.stringify(comprador);
		alert('Json data: ' +data);
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				console.log(xhr.responseText);
				var jsonResponse = JSON.parse(xhr.responseText);
				if (jsonResponse.response == "Fail"){
					alert('Error: '+jsonResponse.message);
				}else{
					alert(jsonResponse.message);
					window.location="productos.html";
					alert('Good '+jsonResponse.message);
				}
			}
		}
		xhr.send(data);
}

function logout(){
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("Rol");
	window.location="login.html";
}
