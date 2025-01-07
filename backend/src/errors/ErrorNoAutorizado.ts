import responses from "../static/responses";
import ErrorGenerico from "./ErrorGenerico";

export default class ErrorNoAutorizado extends ErrorGenerico {    
    constructor(_message: string) {
      super(_message, responses.UNAUTHORIZED);
    }
}