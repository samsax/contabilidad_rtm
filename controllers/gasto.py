from json import dumps 
@auth.requires_login()
def crear():
	return dict()


def guardar_gasto():

	insert_response = db.gasto.insert(**db.gasto._filter_fields(request.post_vars))
	return dumps(insert_response)
