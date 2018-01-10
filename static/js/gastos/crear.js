$(document).ready(function() {    
    $.ajax( 
            {
                type: "POST",
                url: urlOpcionesGastos,
                success: function( data ) {
                    response = $.parseJSON(data);
                    if(response.success){
                        $.each(response.proveedores, function(index,data){
                            $('#gasto_proveedor_id').append( '<option value="'+index+'">'+data.nombre+'</option>');
                        });
                         $.each(response.tipos_iva, function(index,data){
                            $('#gasto_tipo_iva').append( '<option value="'+index+'" data-porcentaje='+data.porcentaje +' >'+data.nombre+'</option>');
                        });
                                                                        
                    }
                }
            })
   
});

 $('#gasto_tipo_iva').on('change',function(){
    CalcularValores();
 })

 $( function() {
   $('#gasto_fecha_gasto').datepicker();
  } );

function CalcularValores(){

    valorBruto = $('#gasto_valor_bruto').val();
    console.log(valorBruto);
    tipoIva = $('#gasto_tipo_iva').find(":selected").data('porcentaje');
    console.log(tipoIva);
    $('#gasto_valor_neto').val(parseFloat(valorBruto) + parseFloat(valorBruto*tipoIva/100));
    $('#gasto_monto_iva').val(parseFloat(valorBruto*tipoIva/100));
} 