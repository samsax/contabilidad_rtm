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

    $(document).on("click", "#guardar_gasto", function() {
           valorBruto =$('#gasto_valor_bruto').val();
           fecha = $('#gasto_fecha_gasto').val();
           proveedor = $('#gasto_proveedor_id').val();
           iva = $('#gasto_tipo_iva').val();
           montoIva = $('#gasto_monto_iva').val();
           facturaProveedor = $('#gasto_factura_proveedor').val();
           valorNeto = $('#gasto_valor_neto').val();
      $.ajax({
        url: url_agregar_gasto,
        data: {
           valor_neto: valorNeto,
           valor_bruto: valorBruto,
           fecha: fecha,
           proveedor_id: proveedor,
           iva_id: iva,
           monto_iva: montoIva,
           factura_proveedor: facturaProveedor,
        },
        type: "POST",
        success: function(data) {
            aviso("success", {contenido: "Gasto agredado "});
        },
        error: function() {
            aviso("error", {contenido: "Error"});
        }
       });
   });
   
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
