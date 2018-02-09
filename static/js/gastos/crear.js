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
           descripcion = $('#gasto_descripcion').val();
      $.ajax({
        url: urlAgregarGasto,
        data: {
           valor_neto: valorNeto,
           valor_bruto: valorBruto,
           fecha: fecha,
           proveedor_id: proveedor,
           iva_id: iva,
           monto_iva: montoIva,
           descripcion: descripcion,
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

 $('#gasto_valor_neto').on('input', function() { 
    CalcularValores(true,false);
});

 $('#gasto_valor_bruto').on('input', function() { 
    CalcularValores(false,true);
});

 $( function() {
   $('#gasto_fecha_gasto').datepicker();
  } );

function CalcularValores(inputNeto = false, inputBruto = false){

    valorNeto = $('#gasto_valor_neto').val();
    valorBruto = $('#gasto_valor_bruto').val();
    tipoIva = $('#gasto_tipo_iva').find(":selected").data('porcentaje');
    if (inputBruto){
      $('#gasto_valor_neto').val(parseFloat(valorBruto) + parseFloat(valorBruto*tipoIva/100));
      $('#gasto_monto_iva').val(parseFloat(valorBruto*tipoIva/100));
    }
    else if (inputNeto){
      $('#gasto_valor_bruto').val(parseFloat(valorNeto/(1+(tipoIva/100))));
      $('#gasto_monto_iva').val(parseFloat(valorNeto - (valorNeto/(1+(tipoIva/100)))));
    }  
} 
