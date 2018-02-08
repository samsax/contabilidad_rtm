from json import dumps 
@auth.requires_login()
def crear():
	return dict()

def ver():
	return dict()


def guardar_gasto():
	insert_response = db.gasto.insert(**db.gasto._filter_fields(request.post_vars))
	return dumps(insert_response)


def lista_gasto():
	gastos = db((db.gasto.id > 0) 
				& (db.proveedor.id == db.gasto.proveedor_id)
				& (db.iva.id == db.gasto.iva_id)).select(db.gasto.ALL, 
														db.proveedor.nombre,
														db.iva.porcentaje)
	respuesta = []
	total = 0
	impuesto = 0
	subtotal = 0
	for gasto in gastos:
		
		row = dict(fecha= str(gasto.gasto.fecha_gasto),
					proveedor = gasto.proveedor.nombre,
					iva = gasto.iva.porcentaje,
					subtotal = gasto.gasto.valor_bruto,
					total = gasto.gasto.valor_neto,
					monto_iva = gasto.gasto.monto_iva,
					descripcion = gasto.gasto.descripcion)
		total += gasto.gasto.valor_neto
		subtotal +=  gasto.gasto.valor_bruto
		impuesto += gasto.gasto.monto_iva
		respuesta.append(row)
	return dumps(dict(success= True,gastos= respuesta, subtotal = subtotal,
					total = total,
					monto_iva = impuesto))