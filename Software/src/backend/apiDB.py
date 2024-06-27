#Importar librerías
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import mysql.connector
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt, jwt_required, get_jwt_identity)
import base64

# Inicializar app.
app = Flask(__name__)

# Permitir conexiones cualquier origen.
CORS(app)

# Incializar Bcrypt.
bcrypt = Bcrypt(app)

# Configurar clave secreta de JWT.
app.config['JWT_SECRET_KEY'] = 'a23e45@o9'

# Inicializar la extensión JWT
jwt = JWTManager(app)

# Configurar las conexiones a la base de datos
db_config_user = {
    "host":"localhost",
    "user":"user",
    "passwd":"!!mCzSKxJp!7yVv-",
    "database":"proyectosoftware"
}

db_config_admin = {
    "host":"localhost",
    "user":"admin",
    "passwd":"Pb]RVEZ.TI[3HVuW",
    "database":"proyectosoftware"
}

def get_db_connection(role):
    if role == 'admin':
        return mysql.connector.connect(**db_config_admin)
    else:
        return mysql.connector.connect(**db_config_user)
    
connector = mysql.connector.connect(**db_config_user)

# Conexión General
@app.route('/')
def index():
    return "Conexión Exitosa!"

#############################################################################################
# Registrar un usuario (POST).
@app.route('/register', methods=['POST'])
def app_register():
    # Datos recibidos en el Request.
    nombre = request.json['Nombre']
    contraseña = request.json['Contraseña']
    correo = request.json["Correo"]

    # Encriptar la contraseña con Bcrypt.
    contraEncriptada = bcrypt.generate_password_hash(contraseña).decode('utf-8')

    # Iniciar conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL.
    try:
        cur.execute("INSERT INTO usuario (Nombre, Correo, Contraseña) VALUES (%s, %s, %s)", (nombre, correo, contraEncriptada))
        db.commit()
    except:
        #Si el usuario ya existe, se emite un mensaje de error.
        cur.close()
        return jsonify({"message": "Usuario ya existe en la base de datos."})
    finally:
        # Cerrar conexión.
        cur.close()

    # Retornar mensaje de confirmación.
    return jsonify({"message": "Usuario Registrado"})

# Confirmar credenciales de usuario - Inicio Sesión (POST).
@app.route('/login', methods=['POST'])
def app_login():
    # Obtener datos del Request.
    mail = request.json['Correo']
    password = request.json['Contraseña']

    # Verificar que ambos espacios estén escritos.
    if not mail or not password:
        return jsonify({"message":"Usuario o Contraseña inválidos!"})

    # Iniciar conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL para obtener los usuarios con cierto.
    query = "SELECT * FROM usuario WHERE correo = %s"
    cur.execute(query, (mail,))
    # Obtener los datos.
    data = cur.fetchone()
    # Cerrar conexión.
    cur.close()

    # Verificar si se encontró algún usuario.
    if data:
        # Encriptar la contraseña del request y verificar que es la contraseña correcta.
        if bcrypt.check_password_hash(data[3], password):
            # Verificar si el usuario ingresado es un administrador.
            role_claim = {"role": "user"}
            if '@andinoapp.cl' in data[2]:
                role_claim = {"role": "admin"}
                print('djksdnk')
                # Conectarse a la BD como admin.
                db = mysql.connector.connect(**db_config_admin)
            # Crear un nuevo token con la identidad del usuario.
            id_usuario = data[0]
            access_token = create_access_token(identity=id_usuario, additional_claims=role_claim)
            print(access_token, 2)
            # Devolver mensaje de éxito con la token.
            response = {
                "message": "Login Exitoso!",
                "access_token": access_token
            }
            return jsonify(response)
        else:
            return jsonify({"message": "Login fallido. Contraseña incorrecta."})
            
    return jsonify({"message": "Login fallido. Usuario no Existe."})
#########################################################################################################

# Obtener el itinerario de un usuario. (GET).
@app.route('/user@id=<int:user_id>/plan', methods=['GET'])
@jwt_required()
def get_plan(user_id):
    # Obtener id_usuario desde el token.
    id_user = get_jwt_identity()
    # Verificar que está accediendo el mismo usuario.
    if user_id != id_user:
        return jsonify({"message": "Acceso denegado!"})

    # Abrir conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM itinerario WHERE ID_Usuario = %s", (user_id,))
    # Obtener los datos.
    data = cur.fetchone()
    # Cerrar conexión.
    cur.close()
    
    # Verificar si se encontró algún itinerario.
    if data:
        # Convertir datos a formato JSON.
        resp = {
            "ID_Itinerario": data[0],
            "ID_Usuario": data[1],
            "Presupuesto": data[2],
            "Fecha de Inicio": data[3],
            "Fecha de Término": data[4]
        }
        return jsonify({"message": "Itinerario Encontrado!"}, resp)
    return jsonify({"message": "Itinerario no existe en la base de datos."})

# Obtener todas las dietas (comidas por día) de un itinerario. (POST).
@app.route('/user@id=<int:user_id>/plan/dietas', methods=['POST'])
@jwt_required()
def get_dietas(user_id):
    # Obtener id_usuario desde el token.
    id_user = get_jwt_identity()
    # Verificar que está accediendo el mismo usuario.
    if user_id != id_user:
        return jsonify({"message": "Acceso denegado!"})
    
    # Obtener el itinerario en base por el request.
    plan_id = request.json["ID_Itinerario"]

    # Abrir conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM dieta WHERE ID_Itinerario = %s", (plan_id,))
    # Obtener los datos.
    data = cur.fetchall()
    # Cerrar conexión.
    cur.close()
    
    # Verificar si se encontró algún itinerario.
    if data:
        # Declarar el arreglo de respuestas.
        resp = []
        # Recorrer las dietas encontradas.
        for data_instance in data:
            # Convertir datos a formato JSON.
            resp.append({"ID_dieta": data_instance[0], "Cantidad de Recetas": data_instance[1], "ID_Itinerario": data_instance[2], "Dia": data_instance[3], "Mes": data_instance[4], "Año": data_instance[5]})
        return jsonify({"message": "Dietas Encontradas!"}, resp)
    return jsonify({"message": "Itinerario no posee dietas u ocurrió un error en la base de datos."})

# Obtener todas las recetas (GET).
@app.route('/recetas', methods=['GET'])
@jwt_required()
def get_all_recetas():
    # Verificar que está accediendo un usuario registrado.
    id_user = get_jwt_identity()
    claims = get_jwt()
    user_role = claims['role']
    print(user_role)

    # Abrir conexión.
    db = get_db_connection(user_role)
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM receta")
    # Obtener los datos.
    data = cur.fetchall()
    # Cerrar conexión.
    cur.close()

    # Verificar si se encontró alguna coincidencia.
    if data:
        # Declarar el arreglo de respuestas.
        resp = []
        # Recorrer las instancias encontradas.
        for data_instance in data:
            # Convertir datos a formato JSON.
            image_base64 = base64.b64encode(data_instance[2]).decode('utf-8')
            resp.append({"Nombre": data_instance[0], "Descripción": data_instance[1], "Imagen": image_base64, "Preparación": data_instance[3]})
        return jsonify({"message": "Recetas Encontradas!"}, resp)
    else:
        return jsonify({"message": "No se encontraron recetas en la base de datos, u ocurrió un error de conexión."})

# Obtener todas las recetas de una dieta (día). (GET).
@app.route('/user@id=<int:user_id>/plan/dieta@id=<int:diet_id>/recetas', methods=['GET'])
@jwt_required()
def get_recetas_dieta(user_id, diet_id):
    # Obtener id_usuario desde el token.
    id_user = get_jwt_identity()
    # Verificar que está accediendo el mismo usuario.
    if user_id != id_user:
        return jsonify({"message": "Acceso denegado!"})

    # Abrir conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM dieta_receta WHERE ID_Dieta = %s", (diet_id,))
    # Obtener los datos.
    data = cur.fetchall()
    # Cerrar conexión.
    cur.close()
    
    
    # Verificar si se encontró alguna coincidencia.
    if data:
        # Declarar el arreglo de respuestas.
        resp = []
        # Declarar variable para almacenar PK de receta.
        receta_id = []
        # Recorrer las instancias encontradas.
        for data_instance in data:
            # Obtener receta asociada.
            receta_id = data_instance[2]

            # Abrir conexión.
            db = get_db_connection('user')
            cur = db.cursor()
            # Ejecutar comando SQL.
            cur.execute("SELECT * FROM receta WHERE Nombre = %s", (receta_id,))
            # Obtener los datos.
            data2 = cur.fetchone()
            # Cerrar conexión.
            cur.close()

            # Verificar si se encontró alguna coincidencia.
            if data2:
                # Convertir datos a formato JSON.
                image_base64 = base64.b64encode(data2[2]).decode('utf-8')
                resp.append({"Nombre": data2[0], "Descripción": data2[1], "Imagen": image_base64, "Preparación": data2[3]})
            else:
                return jsonify({"message": "Receta a buscar no encontrada en la base de datos."})
        return jsonify({"message": "Recetas Asociadas Encontradas!"}, resp)
    else:
        return jsonify({"message": "Dieta no posee recetas u ocurrió un error en la base de datos."})

# Obtener una receta completa con sus ingredientes. (GET).
@app.route('/receta@id=<name>', methods=['GET'])
@jwt_required()
def get_receta_ingredientes(name):    
    # Verificar que está accediendo un usuario registrado.
    id_user = get_jwt_identity()
    claims = get_jwt()
    user_role = claims['role']
    print(user_role)

    # Abrir conexión.
    db = get_db_connection(user_role)
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM receta_ingrediente WHERE Nombre_Receta = %s", (name,))
    # Obtener los datos.
    data = cur.fetchall()
    # Cerrar conexión.
    cur.close()
    
    
    # Verificar si se encontró alguna coincidencia.
    if data:
        # Declarar el arreglo de respuestas.
        resp = []
        # Declarar variable para almacenar PK del ingrediente.
        ingrediente_id = []
        # Recorrer las instancias encontradas.
        for data_instance in data:
            # Obtener ingrediente asociado.
            ingrediente_id = data_instance[2]

            # Abrir conexión.
            db = get_db_connection(user_role)
            cur = db.cursor()
            # Ejecutar comando SQL.
            cur.execute("SELECT * FROM ingrediente WHERE ID_Ingrediente = %s", (ingrediente_id,))
            # Obtener los datos.
            data2 = cur.fetchone()
            # Cerrar conexión.
            cur.close()

            # Verificar si se encontró alguna coincidencia.
            if data2:
                # Convertir datos a formato JSON.
                image_base64 = base64.b64encode(data2[2]).decode('utf-8')
                resp.append({"ID_Ingrediente": data2[0], "Nombre": data2[1], "Imagen": image_base64})
            else:
                return jsonify({"message": "Ingrediente a buscar no encontrada en la base de datos."})
        return jsonify({"message": "Ingredientes Asociados Encontrados!"}, resp)
    else:
        return jsonify({"message": "Receta no posee ingredientes u ocurrió un error en la base de datos."})
    
# Actualizar los datos de una receta en la dieta. (GET)
@app.route('/user@id=<int:user_id>/plan/dieta@id=<int:diet_id>/change', methods=['POST'])
@jwt_required()
def update_dieta(user_id, diet_id):
    # Obtener id_usuario desde el token.
    id_user = get_jwt_identity()
    # Verificar que está accediendo el mismo usuario.
    if user_id != id_user:
        return jsonify({"message": "Acceso denegado!"})

    # Obtener los datos de la receta a cambiar y la receta a insertar.
    current_receta = request.json["receta_actual"]
    new_receta = request.json["receta_nueva"]

    # Abrir conexión.
    db = get_db_connection('user')
    cur = db.cursor()
    # Ejecutar comando SQL.
    cur.execute("SELECT * FROM dieta_receta WHERE Nombre_Receta = %s AND ID_Dieta = %s", (current_receta, diet_id))
    # Obtener los datos.
    data = cur.fetchone()
    # Cerrar conexión.
    cur.close()
    print(data)
    
    
    # Verificar si se encontró alguna coincidencia.
    if data:
        #Actualizar datos de dieta.
        try:
            print("ndkjkjsdfn skf dskjfs")
            # Abrir conexión.
            cur = db.cursor()
            # Ejecutar comando SQL.
            print(new_receta, data[2], data[1])
            cur.execute("UPDATE dieta_receta SET Nombre_Receta = %s WHERE Nombre_Receta = %s AND ID_Dieta = %s", (new_receta, data[2], data[1]))
            # Obtener los datos.
            db.commit()
            # Cerrar conexión.
            cur.close()
        except:
            return jsonify({"message": "Ocurrió un error al momento de actualizar la receta..."})
        return jsonify({"message": "Dieta Actualizada!"})
    else:
        return jsonify({"message": "Dieta no posee la receta a sustituir u ocurrió un error en la base de datos."})



if __name__ == '__main__':
    app.run(debug=True)



