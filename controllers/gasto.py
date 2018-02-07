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
	gastos = db(db.gasto.id > 0).select(db.gasto.ALL)
	return dumps(dict(gastos= gastos))