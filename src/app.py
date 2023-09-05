"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import *
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)

db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/especialidades', methods=['GET'])
def obtener_especialidades():
    especialidades = Especialidad.query.all()
    especialidades_serializadas = [especialidad.serialize() for especialidad in especialidades]
    
    return jsonify(especialidades_serializadas), 200

@app.route('/especialidades', methods=['POST'])
def crear_especialidad():
    data = request.json
    nueva_especialidad = Especialidad(
        nombre_completo=data['nombre'],
        descripcion=data['descripcion']
    )
    db.session.add(nueva_especialidad)
    db.session.commit()
    return jsonify({'message': 'Especialidad creada exitosamente'}), 201

@app.route('/especialidades/<int:id>', methods=['PUT'])
def actualizar_especialidad(id):
    especialidad = Especialidad.query.get(id)
    if especialidad is None:

        
        return jsonify({'error': 'Especialidad no encontrada'}), 404
    
    data = request.json
    especialidad.nombre_completo = data['nombre']
    especialidad.descripcion = data['descripcion']
    db.session.commit()

    return jsonify({'message': 'Especialidad actualizada exitosamente'})

@app.route('/especialidades/<int:id>', methods=['DELETE'])
def eliminar_especialidad(id):
    especialidad = Especialidad.query.get(id)
    if especialidad is None:

        return jsonify({'error': 'Especialidad no encontrada'}), 404
    
    db.session.delete(especialidad)
    db.session.commit()
    
    return jsonify({'message': 'Especialidad eliminada exitosamente'})


@app.route('/especialistas', methods=['GET'])
def obtener_especialistas():
    especialistas = Especialistas.query.all()
    especialistas_serializados = [especialista.serialize() for especialista in especialistas]
    return jsonify(especialistas_serializados), 200

@app.route('/especialistas', methods=['POST'])
def create_especialista():
    data = request.json
    nuevo_especialista = Especialistas(
        nombre_completo=data['nombre'],
        años_experiencia=data['años_experiencia'],
        perfil_profesional=data['perfil_profesional'],
        codigo_profesional=data['codigo_profesional'],
        especialidad_id=data['especialidad_id']
    )
    db.session.add(nuevo_especialista)
    db.session.commit()
    return jsonify({'message': 'Especialista creado exitosamente'}), 201

@app.route('/especialistas/<int:id>', methods=['PUT'])
def update_especialista(id):
    especialista = Especialistas.query.get(id)
    if especialista is None:
        return jsonify({'error': 'Especialista no encontrado'}), 404
    data = request.json
    especialista.nombre_completo = data['nombre']
    especialista.años_experiencia = data['años_experiencia']
    especialista.perfil_profesional = data['perfil_profesional']
    especialista.codigo_profesional = data['codigo_profesional']
    especialista.especialidad_id = data['especialidad_id']
    db.session.commit()
    return jsonify({'message': 'Especialista actualizado exitosamente'})

@app.route('/especialistas/<int:id>', methods=['DELETE'])
def delete_especialista(id):
    especialista = Especialistas.query.get(id)
    if especialista is None:
        return jsonify({'error': 'Especialista no encontrado'}), 404
    db.session.delete(especialista)
    db.session.commit()
    return jsonify({'message': 'Especialista eliminado exitosamente'})


@app.route('/tratamientos', methods=['GET'])
def obtener_tratamientos():
    search = Tratamientos.query.all()  
    search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
    
    return jsonify(search_serialize), 200

@app.route('/tratamientos/<int:id>', methods=['PUT'])
def update_tratamiento(id):
    tratamiento = Tratamientos.query.get(id)
    if tratamiento is None:
        return jsonify({'error': 'Tratamiento no encontrado'}), 404
    data = request.json
    tratamiento.nombre_completo = data['nombre']
    tratamiento.descripcion = data['descripcion']
    tratamiento.especialista_id = data['especialista_id']
    tratamiento.precio = data['precio']
    db.session.commit()
    return jsonify({'message': 'Tratamiento actualizado exitosamente'})

@app.route('/tratamientos/<int:id>', methods=['DELETE'])
def delete_tratamiento(id):
    tratamiento = Tratamientos.query.get(id)
    if tratamiento is None:
        return jsonify({'error': 'Tratamiento no encontrado'}), 404
    db.session.delete(tratamiento)
    db.session.commit()
    return jsonify({'message': 'Tratamiento eliminado exitosamente'})

@app.route('/citas', methods=['GET'])
def obtener_citas():
    citas = Citas.query.all()
    citas_serializadas = [cita.serialize() for cita in citas]
    return jsonify(citas_serializadas), 200

@app.route('/citas', methods=['POST'])
def create_cita():
    data = request.json
    nueva_cita = Citas(
        nombre_paciente=data['nombre'],
        fecha=data['fecha'],
        hora=data['hora'],
        especialidad_id=data['especialidad_id'],
        tratamientos_id=data['tratamientos_id'],
        especialistas_id=data['especialistas_id']
    )
    db.session.add(nueva_cita)
    db.session.commit()
    return jsonify({'message': 'Cita creada exitosamente'}), 201 

@app.route('/citas/<int:id>', methods=['DELETE'])
def eliminar_cita(id):
    cita = Citas.query.get(id)
    if cita is None:
        return jsonify({'error': 'Cita no encontrada'}), 404

    db.session.delete(cita)
    db.session.commit()

    return jsonify({'message': 'Cita eliminada exitosamente'}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
