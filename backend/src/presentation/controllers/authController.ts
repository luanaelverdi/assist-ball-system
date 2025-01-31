import { Request, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import { authService } from "../../services/authService";
import responses from "../../static/responses";

const login = async (req: Request, res: Response) => {
    console.log("req.body de login", req.body);
    try {
        const { email, password } = req.body;
        const response = await authService.login({ email, password });
        ResponseOk(res, responses.OK, response);
    } catch (error) {
        console.error(error);
        ResponseError(res, responses.BAD_REQUEST, error);
    }
};

export const authController = {
    login
}