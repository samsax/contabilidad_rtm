from json import dumps 
@auth.requires_login()
def crear():
	return dict()

def ver():
	return dict()

def guardar():
	insert_response = db.iva.insert(**db.iva._filter_fields(request.post_vars))
	return dumps(insert_response)


def lista():
	ivas = db(db.iva.id > 0).select(db.iva.ALL).as_dict()
	return dumps(dict(success= True,ivas= ivas))