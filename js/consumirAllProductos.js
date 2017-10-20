$(document).ready(function(){ 
	var nombre = sessionStorage.getItem("Nombre");
	var rol = sessionStorage.getItem("Rol");
	if (nombre == null || rol == null || rol == "comprador"){
		alert("Debe loguearse como vendedor para poder acceder a esta página.");
		window.location="login.html";
	}else{
		$("#user").html('<i class="fa fa-fw fa-user"></i> Conectado como '+ nombre + ' - Vendedor');
		$.ajax({
			crossDomain: true,
			type: 'GET',
			url: 'https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/productos',
			contentType: 'application/json; charset=utf-8',
			datatype: 'jsonp',
			success: function (data) {
				var code = '<div class="row">';
				for (i = 0; i < data.length; i++) { 
					code = code + '<div class="col-xs-4 col-md-3"><div class="card mb-3"><a href="#"><img class="card-img-top" src="'+data[i].url_foto+'" alt="" width="30" height="200"></a><div class="card-body"><h6 class="card-title mb-1"><a href="#">'+data[i].nombre+'</a></h6><small>Sku: '+data[i].sku+'</small><br><small>Precio: '+data[i].precio+'</small><br><small>Stock: '+data[i].stock+'</small></div><div class="card-body py-2 small" style="text-align: right"><a class="mr-3 d-inline-block" href="editStockProducto.html?sku='+data[i].sku+'&nombre='+data[i].nombre+'&stock='+data[i].stock+'" ><i class="fa fa-fw fa-refresh"></i>Actualizar stock</a></div></div></div>';
				}
				code = code + '</div>';
				$("#grid").html(code);
			},
			error: function (x, y, z) {
				alert("Error: "+x.responseText +"  " +x.status);
			}
		});
	} 
});

function logout(){
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("Rol");
	window.location="login.html";
}