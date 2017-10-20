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