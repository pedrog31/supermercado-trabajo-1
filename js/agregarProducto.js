$(document).ready(function(){ 
	var nombre = sessionStorage.getItem("Nombre");
	var rol = sessionStorage.getItem("Rol");
	if (nombre == null || rol == null || rol != "vendedor"){
		alert("Debe loguearse como vendedor para poder acceder a esta página.");
		window.location="login.html";
	}
});
	
function addProduct() {
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
		
			var files = document.getElementById('photoupload').files;
			if (!files.length) {
				return alert('Por favor seleccione una imagen para continuar.');
			}
			if($('#skuProducto').val() == "" || $('#nombreProducto').val() == "" || $('#precioProducto').val() == "" || $('#stockProducto').val() == ""){
				alert('No puede dejar ningún campo vacio.');
			}else{
				if(!/^([0-9])*$/.test($('#skuProducto').val()) || !/^([0-9])*$/.test($('#precioProducto' || !/^([0-9])*$/.test($('#stockProducto').val())).val())){
					alert('Los campos SKU, Precio y Stock solo admiten valores numericos.');
				}else{
					if($('#skuProducto').val() == "0" || $('#precioProducto').val() == "0"){
						alert('Ni SKU, ni Precio pueden ser igual a 0.');
					}else{
						var file = files[0];
						var fileName = file.name;
						var albumPhotosKey = encodeURIComponent('example') + '//';
						var photoKey = albumPhotosKey + fileName;
						s3.upload({
							Key: photoKey,
							Body: file,
							ACL: 'public-read'
						}, function(err, data) {
							if (err) {
								return alert('Hubo un error cargando tu foto: ', err.message);
							}else{
								//alert('Foto cargada exitosamente.');
								var photoUrl = "https://s3.us-east-2.amazonaws.com/ingenieriaweb/"+photoKey;
								//alert('Foto: ' +photoUrl);
								var xhr = new XMLHttpRequest();
								var url = "https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/productos";
								xhr.open("POST", url, true);
								xhr.setRequestHeader( 'Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token');
								var producto = { 
									"sku": $('#skuProducto').val(),
									"nombre": $('#nombreProducto').val(),
									"precio": $('#precioProducto').val(),
									"url_foto": photoUrl,
									"stock": $('#stockProducto').val()
								}; 
								var data = JSON.stringify(producto);
								//alert('Json data: ' +data);
								xhr.onreadystatechange=function() {
									if (xhr.readyState==4) {
										console.log(xhr.responseText);
										var jsonResponse = JSON.parse(xhr.responseText);
										if (jsonResponse.response == "Fail"){
											alert('Error: '+jsonResponse.message);
										}else{
											alert(jsonResponse.message);
											window.location="productos.html";
										}
									}
								}
								xhr.send(data);
							}
						});
					}
				}
			}
		}
		
function logout(){
	sessionStorage.removeItem("Nombre");
	sessionStorage.removeItem("Rol");
	window.location="login.html";
}
