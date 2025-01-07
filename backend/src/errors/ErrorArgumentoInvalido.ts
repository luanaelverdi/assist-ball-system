import responses from "../static/responses";
import ErrorGenerico from "./ErrorGenerico";

export default class ErrorArgumentoInvalido extends ErrorGenerico {    
    constructor(_message: string) {
      super(_message, responses.BAD_REQUEST);
    }
}