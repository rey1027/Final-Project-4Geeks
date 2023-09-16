"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint,current_app
from api.models import *
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

def send_email(asunto, destinatario, body):
    message = MIMEMultipart("alternative")
    message["Subject"] = asunto
    message["From"] = email_address
    message["To"] = destinatario
    
    #body en HTML
    html = ''' 
    
    <html>
    <body>
    <div>
    <h1>
    Hola 
    </h1>
     ''' + body + '''   
    </div>
    </body>
    </html>
    '''
    html_mime = MIMEText(html, 'html')

    message.attach(html_mime)

        try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, destinatario, message.as_string())
        return True
    
    except Exception as error:
        print(str(error))
        return False



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registrar', methods=["POST"])
def user_register():
    body = request.get_json()
    email= body["email"]
    password = body["password"]
    nombre_completo= body["nombre_completo"]
    cedula = body["cedula"]
    edad = body["edad"]
    is_active = True

    if body is None:
        raise APIException("Body está vacio", status_code=400)
    if email is None or email == "":
        raise APIException("El email es necesario",status_code=400)
    if password is None or password == "":
        raise APIException("El password es necesario",status_code=400)
    if nombre_completo is None or nombre_completo == "":
        raise APIException("El nombre es necesario",status_code=400)
    if cedula is None or cedula == "":
        raise APIException("El cedula es necesario",status_code=400)

    user = User.query.filter_by(email=email).first()

    #Verificacion para saber si esta en BD
    if user:
        raise APIException("El usuario ya existe en la base de datos",status_code=400)

    #Encriptacion de la contraseña
    password = current_app.bcrypt.generate_password_hash(password,10).decode("utf-8")

    new_register = User(nombre_completo=nombre_completo,
        cedula=cedula,
        edad=edad,
        email=email,
        password=password,
        is_active=is_active
    )

    try:
        db.session.add(new_register)
        db.session.commit()
        return jsonify({"message":"Usuario registrado"}), 201
    except Exception as error:
        return jsonify({"message":"Error al almacenar en BD"}),500
    
@api.route("/inicio-sesion", methods=["POST"])
def login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    if body is None:
        raise APIException("Body está vacío", status_code=400)
    if email is None or email=="":
        raise APIException("Debe ingresar el usuario para iniciar sesion", status_code=400)
    if password is None or password=="":
        raise APIException("El password es necesario para la validacion de credenciales", status_code=400)

    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("Usuario no registrado", status_code=400)

    coincidencia = current_app.bcrypt.check_password_hash(user.password,password)

    if not coincidencia:
        raise APIException("Las credenciales son incorrectas", status_code=400)

    access_token = create_access_token(identity=email)
    return jsonify({"token":access_token}), 200

@api.route("/password", methods=["POST"])
def endpoint_mail():
    body = request.get_json()
    asunto = body["asunto"]
    destinatario = body["destinatario"]
    cuerpo = body["contenido"]

    verificar = send_email(asunto, destinatario, cuerpo)

    if verificar==True:
        return jsonify({"message":"email sent"}), 200
    else:
        return jsonify({"message":"error sending mail"}), 400

        
#Rutas realizadas por Glenda 

#-------------------------------------------------------ESPECIALIDADES--------------------------------------------------------------

@api.route('/especialidades', methods=['GET'])
def obtener_especialidades():
    especialidades = Especialidad.query.all()
    especialidades_serializadas = [especialidad.serialize() for especialidad in especialidades]
    
    return jsonify(especialidades_serializadas), 200

@api.route('/especialidades', methods=['POST'])
def crear_especialidad():
    data = request.json
    nueva_especialidad = Especialidad(
        nombre_completo=data['nombre'],
        descripcion=data['descripcion']
    )
    db.session.add(nueva_especialidad)
    db.session.commit()
    return jsonify({'message': 'Especialidad creada exitosamente'}), 201

@api.route('/especialidades/<int:id>', methods=['PUT'])
def actualizar_especialidad(id):
    especialidad = Especialidad.query.get(id)
    if especialidad is None:

        
        return jsonify({'error': 'Especialidad no encontrada'}), 404
    
    data = request.json
    especialidad.nombre_completo = data['nombre']
    especialidad.descripcion = data['descripcion']
    db.session.commit()

    return jsonify({'message': 'Especialidad actualizada exitosamente'})

@api.route('/especialidades/<int:id>', methods=['DELETE'])
def eliminar_especialidad(id):
    especialidad = Especialidad.query.get(id)
    if especialidad is None:

        return jsonify({'error': 'Especialidad no encontrada'}), 404
    
    db.session.delete(especialidad)
    db.session.commit()
    
    return jsonify({'message': 'Especialidad eliminada exitosamente'})

#--------------------------------------------------ESPECIALISTAS----------------------------------------------------------------------

@api.route('/especialistas', methods=['GET'])
def obtener_especialistas():
    especialistas = Especialistas.query.all()
    especialistas_serializados = [especialista.serialize() for especialista in especialistas]
    return jsonify(especialistas_serializados), 200

@api.route('/especialistas', methods=['POST'])
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

@api.route('/especialistas/<int:id>', methods=['PUT'])
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

@api.route('/especialistas/<int:id>', methods=['DELETE'])
def delete_especialista(id):
    especialista = Especialistas.query.get(id)
    if especialista is None:
        return jsonify({'error': 'Especialista no encontrado'}), 404
    db.session.delete(especialista)
    db.session.commit()
    return jsonify({'message': 'Especialista eliminado exitosamente'})

#-------------------------------------------------------TRATAMIENTOS---------------------------------------------------------------------
@api.route('/tratamientos', methods=['GET'])
def obtener_tratamientos():
    search = Tratamientos.query.all()  
    search_serialize = list(map(lambda x: x.serialize(), search)) # search.map((item)=>{item.serialize()})
    
    return jsonify(search_serialize), 200

@api.route('/tratamientos/<int:id>', methods=['PUT'])
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

@api.route('/tratamientos/<int:id>', methods=['DELETE'])
def delete_tratamiento(id):
    tratamiento = Tratamientos.query.get(id)
    if tratamiento is None:
        return jsonify({'error': 'Tratamiento no encontrado'}), 404
    db.session.delete(tratamiento)
    db.session.commit()
    return jsonify({'message': 'Tratamiento eliminado exitosamente'})

#-------------------------------------------------Citas------------------------------------------------------------------------

@api.route('/citas', methods=['GET'])
def obtener_citas():
    citas = Citas.query.all()
    citas_serializadas = [cita.serialize() for cita in citas]
    return jsonify(citas_serializadas), 200

@api.route('/citas', methods=['POST'])
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

@api.route('/citas/<int:id>', methods=['DELETE'])
def eliminar_cita(id):
    cita = Citas.query.get(id)
    if cita is None:
        return jsonify({'error': 'Cita no encontrada'}), 404

    db.session.delete(cita)
    db.session.commit()

    return jsonify({'message': 'Cita eliminada exitosamente'}), 200