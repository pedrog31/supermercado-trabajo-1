$(document).ready(function(){ 
	var nombre = sessionStorage.getItem("Nombre");
	var rol = sessionStorage.getItem("Rol");
	if (nombre == null || rol == null || rol != "vendedor"){
		alert("Debe loguearse como vendedor para poder acceder a esta página.");
		window.location="login.html";
	}else{
		$("#user").html('<i class="fa fa-fw fa-user"></i> Conectado como '+ nombre + ' - Vendedor');
	}
});

function obtenerVentas() {
    var x = document.getElementById("mySelect").value;
	if (x == 0) $("#table").html("Seleccione el mes del reporte.");
	else
    $.ajax({
		crossDomain: true,
		type: 'GET',
		url: 'https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/ventas/' + x,
		contentType: 'application/json; charset=utf-8',
		datatype: 'jsonp',
		success: function (data) {
			var code,info;
			if (data.length == 0) {
				code = '<div align="center">En este mes no se registra ninguna venta.</div>'
				info = ""
			}else {
				code ='<div class="table-responsive">'
					+ '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">'
					+  '<thead>'
					+    '<tr>'
					+      '<th>#</th>'
					+      '<th>Fecha</th>'
					+      '<th>Documento</th>'
					+      '<th># Doc</th>'
					+      '<th>Subtotal</th>'
					+      '<th>Domicilio</th>'
					+      '<th>Descuento</th>'
					+    '</tr>'
					+  '</thead>'
					+  '<tbody>';

				var i;
				var descuentos = 0;
				for (i = 0; i < data.length; i++) {
					if (data[i].valor_descuento > 0) descuentos++;
					code = code + '<tr>'
								+	 '<td>' + data[i].idCompra + '</td>'
								+	 '<td>' + data[i].fecha + '</td>'
								+    '<td>' + data[i].Comprador_tipo_documento + '</td>'
								+    '<td>' + data[i].Comprador_documento + '</td>'
								+	 '<td>' + data[i].precio_productos + '</td>'
								+    '<td>' + data[i].precio_domicio + '</td>'
								+    '<td>' + data[i].valor_descuento + '</td>'
								  '</tr>';
				}
				code = code + '</tbody> </table> </div>';
		
				var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
			
				var f=new Date();
			
				var fecha = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + " a las " + f.getHours() + ":" + f.getMinutes() + ". ";
			
				info = 'Ultima actualizacion: '
						+	fecha
						+  ' Total de ventas realizadas en el mes: '
						+	i + '.'
						+  ' Descuentos usados en el mes: '
						+  descuentos + '.';
				
				$("#info").html(info);
			}
				$("#info").html(info);
				$("#table").html(code);
		},
		error: function (x, y, z) {
			alert("Error: "+x.responseText +"  " +x.status);
		}
	});
}

function logout(){
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("Rol");
	window.location="login.html";
}

