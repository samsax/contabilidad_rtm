$(document).ready(function() {    
    $.ajax( 
      {
          type: "POST",
          url: urlLista,
          success: function( data ) {
              response = $.parseJSON(data);
              if(response.success){
                  $.each(response.proveedores, function(index,data){
                      $('#dataTable').append( "<tr><td>"+data.nombre+"</td>"+
                        "<td>"+data.nit+"</td>"+
                        "<td>"+data.descripcion+"</td>"+
                        "</tr>");
                  });
                                                                  
              }
          }
      });
  
});


