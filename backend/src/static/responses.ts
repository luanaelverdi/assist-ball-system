export default {
    OK: 200, // solicitud exitosa
    CREATED: 201, // solicitud completada y creado nuevo recurso
    
    BAD_REQUEST: 400, // parametros incorrectos
    UNAUTHORIZED: 401, // el cliente debe autenticarse
    FORBIDDEN: 403, // el cliente no tiene permisos
    NOT_FOUND: 404, // el recurso solitado no fue encontrado

    INTERNAL_SERVER_ERROR: 500, // error interno del servidor
    UNAVAIABLE: 503 // el servidor no puede manejar la solicitud debido a sobrecarga o mantenimiento
}