import responses from "../static/responses";
import ErrorGenerico from "./ErrorGenerico";

export default class ErrorNoDisponible extends ErrorGenerico {    
    constructor(_message: string) {
      super(_message, responses.UNAVAIABLE);
    }
}