
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(50), unique=False, nullable=False)
    cedula = db.Column(db.Integer, unique=True, nullable=False)
    edad = db.Column(db.Integer, unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    rol = db.Column(db.String(5), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "cedula": self.cedula,
            "edad": self.edad,
            "email": self.email,
            "rol": self.rol,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }


class Especialidad(db.Model):
    __tablename__ = 'especialidad'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(30), unique=True, nullable=False)
    descripcion = db.Column(db.String(255), unique=False, nullable=False)

    def serialize(self):
        return{
            "id":self.id, 
            "nombre":self.nombre_completo,
            "descripcion":self.descripcion
        }
    

class Especialistas(db.Model):
    __tablename__ = 'especialistas'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(50), unique=False, nullable=False)
    años_experiencia = db.Column(db.Integer, unique=False, nullable=False)
    perfil_profesional = db.Column(db.String(255), unique=False, nullable=False)
    codigo_profesional = db.Column(db.Integer, unique=True, nullable=False)
    especialidad_id = db.Column(db.Integer, db.ForeignKey('especialidad.id'))

    def serialize(self):
        return{
            "id":self.id, 
            "nombre":self.nombre_completo,
            "años_experiencia":self.años_experiencia,
            "perfil_profesional":self.perfil_profesional,
            "codigo_profesional":self.codigo_profesional,
            "especialidad_id":self.especialidad_id
        }

class Tratamientos(db.Model):
    __tablename__ = 'tratamientos'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(50), unique=False, nullable=False)
    descripcion = db.Column(db.String(255), unique=False, nullable=False)
    especialista_id = db.Column(db.Integer, db.ForeignKey('especialistas.id'))
    precio = db.Column(db.Integer, unique=False, nullable=False)

    def serialize(self):
        return{
            "id":self.id, 
            "nombre":self.nombre_completo,
            "descripcion":self.descripcion,
            "especialista_id":self.especialista_id,
            "precio":self.precio     
        }


class Citas(db.Model):
    __tablename__ = 'citas'
    id = db.Column(db.Integer, primary_key=True)
    nombre_paciente = db.Column(db.String(50), unique=False, nullable=False)
    fecha = db.Column(db.Date, unique=False, nullable=False)
    hora = db.Column(db.Time, unique=False, nullable=False)
    especialidad_id = db.Column(db.Integer, db.ForeignKey('especialidad.id'))
    tratamientos_id = db.Column(db.Integer, db.ForeignKey('tratamientos.id'))
    especialistas_id = db.Column(db.Integer, db.ForeignKey('especialistas.id'))

    def serialize(self):
        return{
            "id":self.id, 
            "nombre":self.nombre_paciente,
            "fecha":self.fecha,
            "hora": str(self.hora),
            "especialidad_id":self.especialidad_id,
            "tratamientos_id":self.tratamientos_id,
            "especialistas_id":self.especialistas_id
        }

class TokenBlocked(db.Model):
    __tablename__= "tokenblocked"
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(200), unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable = False, default = datetime.datetime.utcnow)

    def serialize(self):
        return{
            "id":self.id, 
            "token":self.token,
            "email":self.email,
            "date":self.date,
        }





  


