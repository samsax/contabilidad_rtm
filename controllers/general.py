from json import dumps, loads

#Retornar tipos de iva y lista de proveedores
def opciones_gastos():
	tipos_iva = db(db.iva.id > 0).select().as_dict()
	proveedores = db(db.proveedor.id > 0).select().as_dict()
	return dumps({'success':True, "tipos_iva":tipos_iva, "proveedores": proveedores})