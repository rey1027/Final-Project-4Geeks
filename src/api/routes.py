"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint,current_app
from api.models import *
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity,get_jwt
from flask_jwt_extended import jwt_required

#Librerias para email

import random 
import string
import smtplib, ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from email.mime.base import MIMEBase
from email import encoders


smtp_address = os.getenv("SMTP_ADDRESS")
smtp_port = os.getenv("SMTP_PORT")
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")

api = Blueprint('api', __name__)

def send_email(asunto, email_receptor,body):
    
    mensaje= MIMEMultipart("alternativo")
    mensaje["Subject"] = asunto
    mensaje['From']= email_address
    mensaje["To"]= email_receptor

    # Version HTML
    html = '''
    <html>
    <body>
    <div>
    <h1> Smile Clinic </h1>
    <p>Buenas</p>
    ''' + body +'''
    <p> Cualquier duda o consulta no dude en contactarnos, que estamos para servirle </p>

    <h4>Saludos</h4>
    </div>
    </body>
    </html>
    '''
    
    html_mime = MIMEText(html, 'html')

    mensaje.attach(html_mime)

    try:
        context= ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_address,smtp_port, context=context) as server:
            server.login(email_address,email_password)
            server.sendmail(email_address,email_receptor,mensaje.as_string())
        return True 
    except Exception as error:
        print(str(error))
        return False 


def verify_token(jti):
    search = TokenBlocked.query.filter_by(token=jti).first()
    if search == None:
        return True #No esta bloqueado
    else:
        return False #Esta bloqueado


def generate_random_password():
    caracteres = string.ascii_letters + string.digits
    new_password = ''.join(random.choice(caracteres) for _ in range(8))
    return new_password


@api.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email_receptor = data.get("email")
    
    if email_receptor:
        new_password = generate_random_password()

        user = User.query.filter_by(email=email_receptor).first()
        user_S = User.query.filter_by(email=email_receptor).first().serialize()

        if user:
            hashed_password = current_app.bcrypt.generate_password_hash(new_password,10).decode("utf-8")
            user.password = hashed_password
            db.session.commit()

            asunto = "Recuperación de contraseña"
            body = '''<p>Estimad@ '''+ user_S["nombre_completo"]+''' se le comunica que usted a solicitado un cambio de contraseña en el sistema Smile Clinic</p>
                <p> Su <b>nueva contraseña </b> para ingresar al sistema es la siguiente:''' + new_password +'''</p>'''
            
            
            send_email(asunto, email_receptor, body)

            return jsonify({"message": "Se ha enviado una nueva contraseña por correo electrónico."}), 200
        else:
            return jsonify({"message": "Dirección de correo electrónico no encontrada."}), 404
    else:
        return jsonify({"message": "Se requiere una dirección de correo electrónico válida para recuperar la contraseña."}), 400


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    verification = verify_token(get_jwt()["jti"])
    if verification ==False:
        return jsonify({"message":"Prohibido"}) , 403 
     

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
    rol= "user"

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
        rol=rol,
        is_active=is_active,
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
    return jsonify({"token":access_token, "user": user.serialize() }), 200  #Add user

@api.route("/isauth" , methods=["GET"])
@jwt_required()
def user_is_auth():
    verification = verify_token(get_jwt()["jti"])
    if verification ==False:
        return jsonify({"message":"Prohibido"}) , 403 
    
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("Usuario no registrado", status_code=400)
    return jsonify({"user": user.serialize() }), 200  #Add user

@api.route("/logout" , methods=["POST"])
@jwt_required()
def log_out():
    verification = verify_token(get_jwt()["jti"])
    if verification ==False:
        return jsonify({"message":"Prohibido"}) , 403 
    try:
        jti = get_jwt()["jti"]
        block = TokenBlocked(
            token =jti,
            email = get_jwt_identity()
        )
        db.session.add(block)
        db.session.commit()
        return jsonify ({"message": "Cerro sesión correctamente"}),200
    except Exception as error:
        print(str(error))
        return jsonify ({"message": "Error al salir de la sesión"}),400

    user = User.query.filter_by(email=email).first().serialize()
    return jsonify({"token":access_token, "nombre":user["nombre_completo"]}), 200

        
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

@api.route('/especialistas/especialidad/<int:id>', methods=['GET'])
def obtener_especialistas_x_especialidad(id):
    especialistas = Especialistas.query.filter_by(especialidad_id=id).all()
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
    search_serialize = list(map(lambda x: x.serialize(), search)) 
    
    return jsonify(search_serialize), 200

@api.route('/tratamientos/especialista/<int:id>', methods=['GET'])
def obtener_tratamientos_x_especialista(id):
    tratamientos = Tratamientos.query.filter_by(especialista_id=id).all()
    tratamientos_serializados = [tratamiento.serialize() for tratamiento in tratamientos]
    return jsonify(tratamientos_serializados), 200

@api.route('/tratamientos', methods=['POST'])
def create_tratamiento():
    data = request.json
    nuevo_tratamiento = Tratamientos(
        nombre_completo=data['nombre'],
        descripcion=data['descripcion'],
        precio=data['precio'],
        especialista_id=data['especialista_id'],
    )
    db.session.add(nuevo_tratamiento)
    db.session.commit()
    return jsonify({'message': 'Tratamiento creado exitosamente'}), 201

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

@api.route('/listacitas', methods=['GET'])
@jwt_required()
def obtener_citas():
    verification = verify_token(get_jwt()["jti"])
    if verification ==False:
        return jsonify({"message":"Prohibido"}) , 403 
    
    citas = Citas.query.all()
    citas_serializadas = [cita.serialize() for cita in citas]
    return jsonify(citas_serializadas), 200

@api.route('/citas', methods=['POST'])
@jwt_required()
def create_cita():
    verification = verify_token(get_jwt()["jti"])
    if verification ==False:
        return jsonify({"message":"Prohibido"}) , 403 
    
    data = request.json

    nueva_cita = Citas(
        nombre_paciente= data['nombre'],
        fecha=data['fecha'],
        hora=data['hora'],
        tratamientos_id=data['tratamientos_id'],
        especialistas_id=data['especialistas_id']
    )
    email_receptor= data["email"]


    tratamiento = Tratamientos.query.get(nueva_cita.tratamientos_id)
    especialista = Especialistas.query.get(nueva_cita.especialistas_id)
    trata = Tratamientos.query.filter_by(id=nueva_cita.tratamientos_id).first().serialize()
    doctor = Especialistas.query.filter_by(id=nueva_cita.especialistas_id).first().serialize()

    if tratamiento is None:
        return jsonify({'error': 'Tratamiento no encontrado'}), 404
    elif especialista is None:
        return jsonify({'error': 'Especialista no encontrado'}), 404
    

    asunto = "Confirmación de citas"
    body = '''<p>Estimad@ '''+ data["nombre"]+''' se le comunica sobre la cita que reservo:</p>
                <p><b>Fecha de la cita:</b> ''' + data["fecha"] +'''</p>
                <p><b>Hora de la cita:</b> ''' + data ["hora"] +'''</p>
                <p><b>Tratamiento:</b>''' + trata['nombre'] +  '''</p>
                <p><b>Especialidad:</b>''' + doctor['nombre_de_especialidad']+ '''</p>
                <p><b>Especialista:</b>'''+ doctor["nombre"] + '''</p>
            '''
    

    try:
        db.session.add(nueva_cita)
        send_email(asunto, email_receptor, body)
        db.session.commit()
    except:
        return jsonify({'error': 'Problema al insertar cita'}), 400
    
    return jsonify({'message': 'Cita creada exitosamente'}), 201 

@api.route('/citas/<int:id>', methods=['DELETE'])
def eliminar_cita(id):
    cita = Citas.query.get(id)
    
    delete_cita = Citas.query.filter_by(id=id).first().serialize()
    paciente = User.query.filter_by(nombre_completo= delete_cita["nombre"]).first().serialize()

    if cita is None:
        return jsonify({'error': 'Cita no encontrada'}), 404
    
    email_receptor= paciente["email"]

    asunto = "Cancelación de cita"
    body = '''Estimad@'''+ delete_cita["nombre"]+''' se le informa la cancelación de la siguiente cita:
                <p><b>Fecha de la cita:</b> ''' + delete_cita["fecha"] +'''</p>
                <p><b>Hora de la cita:</b> ''' + delete_cita ["hora"] +'''</p>
                <p><b>Tratamiento:</b>''' + delete_cita['tratamiento'] +  '''</p>
                <p><b>Especialista:</b>'''+ delete_cita["especialista"] + '''</p>
            Esto se debe a compromisos del especialista, ingrese nuevamente a la página y solicitud nuevamente la cita en el espacio de su preferencia.
            Se le agrecede la comprención.
            '''
    send_email(asunto, email_receptor, body)
    db.session.delete(cita)
    db.session.commit()

    return jsonify({'message': 'Cita eliminada exitosamente en el sistema y notificación enviada al usuario'}), 200