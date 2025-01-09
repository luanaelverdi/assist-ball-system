import { Request, response, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import { assistanceService } from "../../services/assistanceService";
import responses from "../../static/responses";

const getAll = async (req: Request, res: Response) => {
    const query = {
        search: req.query.search ? req.query.search as string : null
    };

    try {
        const users = await assistanceService.getAll(query);
        ResponseOk(res, responses.OK, users);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const getByID = async (req: Request, res: Response) => {
    try {
        const assis = await assistanceService.getByID(Number(req.params.id));
        ResponseOk(res, responses.OK, assis);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const getByDates = async (req: Request, res: Response) => {
    try {
        const assis = await assistanceService.getByDates(new Date(req.params.date));
        ResponseOk(res, responses.OK, assis);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const add = async (req: Request, res: Response) => {
    try {
        const body = {
            date: new Date(req.body.date),
            entry_time: new Date(req.body.entry_time)
        };

        const assistance = await assistanceService.add(body);
        ResponseOk(res, responses.CREATED, assistance);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

export const assistanceController = {
    getAll,
    getByID,
    getByDates,
    add
};