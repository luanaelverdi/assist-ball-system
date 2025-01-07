import responses from "../static/responses";
import ErrorGenerico from "./ErrorGenerico";

export default class ErrorRecursoNoEncontrado extends ErrorGenerico {    
    constructor(_message: string) {
      super(_message, responses.NOT_FOUND);
    }
}