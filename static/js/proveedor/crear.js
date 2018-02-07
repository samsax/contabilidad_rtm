$(document).ready(function() {    
    
    $(document).on("click", "#botonenviar", function() {

      if(validaForm()){                               // Primero validará el formulario.
            $.post(urlAgregarProveedor,$("#formdata").serialize(),function(res){
                $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
                if(res == 1){
                    $("#exito").delay(500).fadeIn("slow");      // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
                } else {
                    $("#fracaso").delay(500).fadeIn("slow");    // Si no, lo mismo, pero haremos aparecer el div "fracaso"
                }
            });
        }
        });   
});


function validaForm(){
    // Campos de texto
    if($("#nombre").val() == ""){
        alert("El campo Nombre no puede estar vacío.");
        $("#nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#nit").val() == ""){
        alert("El campo NIT no puede estar vacío.");
        $("#nit").focus();
        return false;
    }
    return true; // Si todo está correcto
}