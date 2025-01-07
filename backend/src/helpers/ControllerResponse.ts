import { Response } from 'express';
import ErrorGenerico from '../errors/ErrorGenerico';
import responses from '../static/responses';

export const ResponseOk = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json({ data });
};

export const ResponseError = (res: Response, statusCode: number, error: any) => {
    if (error instanceof ErrorGenerico) return res.status(error.statusCode).json({ error: { message: error.message } });
    else return res.status(responses.INTERNAL_SERVER_ERROR).json({ error: { message: "Ha ocurrido un error inesperado." } });
};