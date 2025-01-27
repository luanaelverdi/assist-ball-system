import { Request, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import responses from "../../static/responses";
import ErrorNoDisponible from "../../errors/ErrorNoDisponible";
const fetch = require('node-fetch');

const obtenerRuta = async (req: Request, res: Response) => {
    try {
        const ROUTER_API_URL = 'https://router.project-osrm.org/route/v1';
        let intentos = 0;
        const fetchData = async () => {
            if (intentos > 10) throw new ErrorNoDisponible("Se han realizado demasiadas peticiones.");
            intentos++;
            try {
                const request = await fetch(ROUTER_API_URL+req.url);
                if (!request.ok) return await fetchData();
                const response: any = await request.json();
                if (response.code != 'Ok') return await fetchData();
                return response;
            } catch (error) {
                return await fetchData();   
            }
        }

        ResponseOk(res, responses.OK, await fetchData());
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
}

export const routeController = {
    obtenerRuta
}