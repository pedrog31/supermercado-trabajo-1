function validar(){
	var todo_correcto = true;
	if(document.getElementById('inputPassword').value.length < 1 ){
		todo_correcto = false;			  
	}
	var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	var email = document.form1.inputEmail.value;
	if (!expresion.test(email)){
		todo_correcto = false;
	}
	if(!todo_correcto){
		alert('Algunos campos no son correctos, vuelva a revisarlos');
	}else{
		var xhr = new XMLHttpRequest();
		var url = "https://j6klah0fic.execute-api.us-east-2.amazonaws.com/SuperMarket/login";
		xhr.open("POST", url, true);
		xhr.setRequestHeader( 'Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
		console.log($('#inputEmail').val());
		console.log($('#inputPassword').val());
		var user = { 
			"email": $('#inputEmail').val(),
			"pass": hex_md5($('#inputPassword').val())
		};
		//console.log("md5: "+hex_md5($('#inputPassword').val()));		
		var data = JSON.stringify(user);
		//alert('Json data: ' +data);
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				console.log('Respuesta '+xhr.responseText);
				var jsonResponse = JSON.parse(xhr.responseText);
				if (jsonResponse.response == "Fail"){
					alert('El usuario no existe o la contraseña es incorrecta.');
				}else{
					sessionStorage.setItem("Rol", jsonResponse.response);
					sessionStorage.setItem("Nombre", jsonResponse.nombre);
					if (jsonResponse.response == "vendedor"){
						window.location="productos.html";
					}else{
						window.location="productosC.html";
					}
					
				}
			}
		}
		xhr.send(data);
	}
	return todo_correcto;
}