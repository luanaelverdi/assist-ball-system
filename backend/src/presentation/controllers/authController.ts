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
        console.log(req.body + "BODY controller despues de llamar a login de service");
        console.log(response + "RESPONSE controller");
        ResponseOk(res, responses.OK, response);
    } catch (error) {
        console.error(error);
        ResponseError(res, responses.BAD_REQUEST, error);
    }
};

export const authController = {
    login
}