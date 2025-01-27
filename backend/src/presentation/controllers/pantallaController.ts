import { Request, Response } from "express"
import JWT from "../../helpers/JWT"
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import responses from "../../static/responses";
import { pantallaService } from "../../services/pantallaService";
import ErrorNoAutorizado from "../../errors/ErrorNoAutorizado";

const buscarPorTipo = async (req: Request, res: Response) =>{
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) throw new ErrorNoAutorizado("Token Invalido.");
        const usuario = JWT.verificarToken(token);

        const pathPadre = req.query.path_padre as string | undefined;

        let resultados;

        if (pathPadre === undefined) {
            resultados = await pantallaService.buscarPorTipo(usuario.type_user);
        } else {
            resultados = await pantallaService.buscarPorTipoConPadre(usuario.type_user, pathPadre);
        }

        ResponseOk(res, responses.OK, resultados);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.BAD_REQUEST, error);
    }
}

export const pantallaController = {
    buscarPorTipo
}