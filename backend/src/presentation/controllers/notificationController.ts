import { Request, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import { notificationService } from "../../services/notificationService";
import responses from "../../static/responses";

const getAll = async (req: Request, res: Response) => {
    const query = {
        search: req.query.search ? req.query.search as string : null
    };

    try {
        const notifications = await notificationService.getAll(query);
        ResponseOk(res, responses.OK, notifications);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const getByID = async (req: Request, res: Response) => {
    try {
        const notification = await notificationService.getByID(Number(req.params.id));
        ResponseOk(res, responses.OK, notification);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const add = async (req: Request, res: Response) => {
    try {
        const body = {
            description: req.body.description
        };

        const notification = await notificationService.add(body);
        ResponseOk(res, responses.CREATED, notification);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const modify = async (req: Request, res: Response) => {
    try {
        const body = {
            description: req.body.description
        };

        const notification = await notificationService.modify(Number(req.params.id), body);
        ResponseOk(res, responses.OK, notification);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

export const notificationController = {
    getAll,
    getByID,
    add,
    modify
};