Funciones:

Registro -> app_register() -> Recibe JSON con "Nombre", "Correo" y "Contraseña" -> Entrega un JSON con "message".

Inicio de Sesión -> app_login() -> Recibe JSON con "Correo" y "Contraseña" -> Entrega un JSON con "message" y la token del usuario.

Obtener Itinerario del Usuario -> get_plan(user_id) -> Recibe la token del usuario -> Entrega un JSON con "message" y un JSON de itinerario.

Obtener Días (Dietas) -> get_dietas(user_id) -> Recibe la token del usuario y un JSON con "ID_Itinerario" -> Entrega un JSON con "message y JSON con las dietas.

Obtener Recetas de un Itinerario -> get_recetas_dieta(user_id, diet_id) -> Recibe la token del usuario -> Entrega un JSON con "message" y JSON con las recetas.

Obtener Todas las Recetas -> get_all_recetas(user_id, diet_id) -> Recibe la token del usuario -> Entrega un JSON con "message" y JSON con las recetas.

Obtener Ingredientes de la Receta -> get_receta_ingredientes(name) -> Recibe la token del usuario -> Entrega un JSON con "message" y JSON con los Ingredientes.

Actualizar Receta. -> update_dieta(user_id, diet_id) -> Recibe la token del usuario y Recibe JSON con los nombres de "receta_actual" y "receta_nueva" -> Entrega un JSON con "message".


Rutas de Conexión:

Registro: /register

Inicio de Sesión: /login

Obtener Itinerario del Usuario /user@id=<int:user_id>/plan

Obtener Días (Dietas) de un itinerario: /user@id=<int:user_id>/plan/dietas

Obtener Recetas de una Dieta: /user@id=<int:user_id>/plan/dieta@id=<int:diet_id>/recetas

Obtener Todas las Recetas: /recetas

Obtener Receta e Ingredientes: /receta@id=<name>

Actualizar Receta: /user@id=<int:user_id>/plan/dieta@id=<int:diet_id>/change
