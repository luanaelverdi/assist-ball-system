import { Request, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import { authService } from "../../services/authService";
import responses from "../../static/responses";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email + "EMAIL controller");
        console.log(password + "PASS controller");
        console.log(req.body.email + "BODY EMAIL controller");
        console.log(req.body.password + "BODY PASS controller");
        const response = await authService.login({ email, password });
        console.log(req.body.email, req.body.password + "BODY controller despues de llamar a login de service");
        console.log(response.user.id_user + "RESPONSE controller");
        ResponseOk(res, responses.OK, response);

        console.log("usuario autenticadoOOOO")
    } catch (error) {
        console.error(error);
        console.log(req.body);
        ResponseError(res, responses.BAD_REQUEST, error);
    }
};

export const authController = {
    login
}