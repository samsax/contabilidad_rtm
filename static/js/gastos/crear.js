$(document).ready(function() {    
    $.ajax( 
            {
                type: "POST",
                url: urlOpcionesGastos,
                success: function( data ) {
                    response = $.parseJSON(data);
                    if(response.success){
                        $.each(response.proveedores, function(index,data){
                            $('#gasto_proveedor_id').append( '<option value="'+index+'">'+data.nombre+" "+data.nit+'</option>');
                        });
                         $.each(response.tipos_iva, function(index,data){
                            $('#gasto_tipo_iva').append( '<option value="'+index+'" data-porcentaje='+data.porcentaje +' >'+data.nombre+'</option>');
                        });
                                                                        
                    }
                }
            })

    $(document).on("click", "#guardar_gasto", function() {
           valorBruto = accounting.unformat($('#gasto_valor_bruto').val());
           fecha = $('#gasto_fecha_gasto').val();
           proveedor = $('#gasto_proveedor_id').val();
           iva = $('#gasto_tipo_iva').val();
           montoIva = accounting.unformat($('#gasto_monto_iva').val());
           facturaProveedor = $('#gasto_factura_proveedor').val();
           valorNeto = accounting.unformat($('#gasto_valor_neto').val());
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
        beforeSend: function(data) {
            $.notify("Creando gasto", "info");
        },
        success: function(data) {
            $.notify("Gasto agregado", "success");
            LimpiarForm();
        },
        error: function() {
            $.notify("BOOM!", "error");
        }
       });
   });
   
});

 $('#gasto_tipo_iva').on('change',function(){
    CalcularValores(true,false);
 })

 $('#gasto_valor_neto').on('input', function() { 
    CalcularValores(true,false);
});

 $('#gasto_valor_bruto').on('input', function() { 
    CalcularValores(false,true);
});

 $('#gasto_valor_bruto').on('input', function() { 
    CalcularValores(false,true);
});


$('.moneda').on('focus', function() { 
    QuitarFormato();
});

$('.moneda').on('focusout', function() { 
    FormatearValores();
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


function FormatearValores(){
   $('#gasto_valor_neto').val(accounting.formatMoney( $('#gasto_valor_neto').val()));
   $('#gasto_valor_bruto').val(accounting.formatMoney( $('#gasto_valor_bruto').val()));
   $('#gasto_monto_iva').val(accounting.formatMoney( $('#gasto_monto_iva').val()));
} 

function QuitarFormato(){
   $('#gasto_valor_neto').val(accounting.unformat( $('#gasto_valor_neto').val()));
   $('#gasto_valor_bruto').val(accounting.unformat( $('#gasto_valor_bruto').val()));
   $('#gasto_monto_iva').val(accounting.unformat( $('#gasto_monto_iva').val()));
}

function LimpiarForm(){
  $('#gasto_valor_bruto').val(0)
  $('#gasto_monto_iva').val(0);
  $('#gasto_valor_neto').val(0);
  $('#gasto_factura_proveedor').val('');
   $('#gasto_descripcion').val('');
}

// accounting.unformat("£ 12,345,678.90 GBP"); // 12345678.9