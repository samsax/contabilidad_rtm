from json import dumps 
@auth.requires_login()
def crear():
	return dict()

def guardar():
	insert_response = db.proveedor.insert(**db.proveedor._filter_fields(request.post_vars))
	return dumps(insert_response)
