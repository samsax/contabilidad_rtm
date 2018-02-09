$(document).ready(function() {    
    $.ajax( 
      {
          type: "POST",
          url: urlLista,
          success: function( data ) {
              response = $.parseJSON(data);
              if(response.success){
                  $.each(response.ivas, function(index,data){
                      $('#dataTable').append( "<tr><td>"+data.nombre+"</td>"+
                        "<td>"+data.porcentaje+" %</td>"+
                        "</tr>");
                  });
                                                                  
              }
          }
      });
  
});


