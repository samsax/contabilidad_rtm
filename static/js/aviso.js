function aviso(tipo_aviso, parametros) {
   switch (tipo_aviso) {
      case 'proceso':
         var obj = {
            titulo: "Procesando la información.",
            contenido: "Espere un momento por favor.",
            icono: "fa-clock-o",
            tiempo: undefined,
            color: "#1c84c6",
         }
         break;
      case 'exito':
         var obj = {
            titulo: "Listo.",
            contenido: "Operación completada satisfactoriamente.",
            icono: "fa-check-circle",
            tiempo: 4000,
            color: "#27C43A",
         }
         break;
      case 'error':
         var obj = {
            titulo: "Lo sentimos, la operación no pudo ser completada.",
            contenido: "Por favor inténtelo de nuevo más tarde.",
            icono: "fa-times-circle",
            tiempo: undefined,
            color: "#A90329",
         }
         break;
      case 'advertencia':
         var obj = {
            titulo: "Advertencia.",
            contenido: "Por favor inténtelo de nuevo más tarde.",
            icono: "fa-exclamation-circle",
            tiempo: undefined,
            color: "#FFA70B",
         }
         break;
      default:
         var obj = {
            titulo: "Aviso.",
            contenido: "Aqui va el aviso.",
            icono: "fa-warning",
            tiempo: undefined,
            color: "#1c84c6"
         }
         break;
   }
   $.extend(obj, parametros);

   $('#divSmallBoxes > div').remove();
   $.smallBox({
      title: obj.titulo,
      content: "<i class='fa " + obj.icono + "'></i> <i> " + obj.contenido + "</i>",
      color: obj.color,
      iconSmall: "fa " + obj.icono + " bounceInUp animated",
      timeout: obj.tiempo
   });
}
