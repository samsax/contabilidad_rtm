from json import dumps 
@auth.requires_login()
def crear():
	return dict()

def ver():
	return dict()

def guardar():
	insert_response = db.proveedor.insert(**db.proveedor._filter_fields(request.post_vars))
	return dumps(insert_response)


def lista():
	proveedores = db(db.proveedor.id > 0).select(db.proveedor.ALL).as_dict()
	return dumps(dict(success= True,proveedores= proveedores))