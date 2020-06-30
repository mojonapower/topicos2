//var wsUrl = "http://url.dominio/server.php?wsdl";//para probar de afuera.

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
document.addEventListener("deviceready", onDeviceReady, false);

function showAlert(msj)
{
    navigator.notification.alert(
        msj,  // message
        'UNAB',   // title
        ''    // buttonName
    );
}//fin function mensaje.

// PhoneGap is ready
    function onDeviceReady() 
    {
		// Do cool things here...
		document.getElementById('largeImage').src='';
		clearCache();
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
    }
    function clearCache() 
    {
		navigator.camera.cleanup();
	}
 
	function getImage(source) 
	{
	    // Retrieve image file location from specified source
		navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL, sourceType: source});	//destinationType: navigator.camera.DestinationType.FILE_URI
	 
    }
    
    function onFail(message) {
    
    clearCache();
		//alert('Captura Descartada.');
		showAlert('Captura Descartada.'+ message);
			
}
 
    function uploadPhoto(imageURI) 
    {
	  var largeImage = document.getElementById('largeImage');
	    largeImage.style.display = 'block';
      largeImage.src ="data:image/jpeg;base64," + imageURI;
      alert(largeImage.src ="data:image/jpeg;base64," + imageURI)
	    
    }
    
   
function enviaFoto()
{
	var user=document.getElementById('user').value;
	//var foto=document.getElementById('largeImage');
	var fotoSrc=document.getElementById('largeImage').src;
	
	if(user=='' || fotoSrc=='')
	{
		showAlert('Debe Ingresar los valores!');
	}
	else
	{
	  //var fotoCod=encodeImageFileAsURL(foto);

            $.ajax({
            cache: false,
            // puede ser GET, POST
            type: "POST",  							
            // Tipo de retorno
            dataType: "html",
            // pagina php que recibe la llamada
            url: "http://72.14.183.67/ws/foto/?" + (new Date().getTime()),  							
            // datos, ej: $_POST['data']
            data: {
                    user:user,
                    foto:fotoSrc				
            },
            /*beforeSend: function(){  
                document.getElementById('divCargando').style.display="block";
                $("#labelCargando").html('Cargando...');	
            },*/
            // acciones cuando me retorna algo el PHP
            success: function( msg){
                   console.log(msg);
		   var data= $.parseJSON(msg);
                    if(data.code==0)
                    {
                        showAlert(data.msg+'Foto Subida!');
                    }
                    else if(data.code==1)
                    {
			showAlert(data.msg+'Ha ocurrido un Error. Archivo ya existe!');  
		      

                    }
                    else
		    {
		      showAlert(data.code+'Ha ocurrido un Error!');  
		    }
            },							
            // acciones cuando hay error en comunicacion el el php
            error: function(xhr, status,msg2 ){
                    //alert('4');			
                    console.log(xhr);
            }
            });//fin ajax
	
        }
}
