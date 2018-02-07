$(document).ready(function() {    
    $.ajax( 
      {
          type: "POST",
          url: urlListaGastos,
          success: function( data ) {
              response = $.parseJSON(data);
              if(response.success){
                  $.each(response.gastos, function(index,data){
                      $('#dataTable').append( "<tr><td>"+data.fecha+"</td>"+
                        "<td>"+data.proveedor+"</td>"+
                        "<td>"+data.descripcion+"</td>"+
                        "<td>"+data.subtotal+"</td>"+
                        "<td>"+data.monto_iva+"("+data.iva+"%)</td>"+
                        "<td>"+data.total+"</td>"+
                        "</tr>");
                  });
                                                                  
              }
          }
      });
  
});


