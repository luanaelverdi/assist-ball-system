import responses from "../static/responses";
import ErrorGenerico from "./ErrorGenerico";

export default class ErrorBaseDeDatos extends ErrorGenerico {    
    constructor(_message?: string) {
      super(_message || 'Ha ocurrido un error en la base de datos.', responses.INTERNAL_SERVER_ERROR);
    }
}