$(document).ready(function(){ 
	var nombre = sessionStorage.getItem("Nombre");
	var rol = sessionStorage.getItem("Rol");
	if (nombre == null || rol == null || rol != "vendedor"){
		alert("Debe loguearse como vendedor para poder acceder a esta página.");
		window.location="login.html";
	}
});

function cargarDatos() {
	var query = window.location.search.substring(1);
	qs = parse_query_string(query);
	$("#skuProducto").html(qs.sku);
	$("#nombreProducto").html(qs.nombre);
	$("#cantidadProducto").html(qs.stock);
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}


function updateProduct() {
	if($('#stockProducto').val() == "" || !/^([1-9])*$/.test($('#stockProducto').val())){
		alert('Ingrese un nuevo valor válido (solo caracteres numericos)');
	}else{
		
		var xhr = new XMLHttpRequest();
		var url = "https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/productos";
		xhr.open("PUT", url, true);
		xhr.setRequestHeader( 'Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token');
		var producto = { 
			"sku": $('#skuProducto').text(),
			"stock": $('#stockProducto').val()
		}; 
		var data = JSON.stringify(producto);
		//alert('Json data: ' +data);
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				console.log(xhr.responseText);
				var jsonResponse = JSON.parse(xhr.responseText);
				if (jsonResponse.response == "Ok"){
					alert(jsonResponse.message);
					window.location="productos.html";
				}
			}
		}
		xhr.send(data);
	}	
}
