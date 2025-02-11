import { Request, Response } from "express";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import { dtPlayersService } from "../../services/dtPlayersService";
import responses from "../../static/responses";

const getAll = async (req: Request, res: Response) => {
    const query = {
        search: req.query.search ? req.query.search as string : null
    };

    try {
        const dtPlayers = await dtPlayersService.getAll(query);
        ResponseOk(res, responses.OK, dtPlayers);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const getByID = async (req: Request, res: Response) => {
    console.log("id obtenido:", req.params.id);
    console.log("req.params:", req.params);
    try {
        const dtPlayers = await dtPlayersService.getByID(Number(req.params.id));
        ResponseOk(res, responses.OK, dtPlayers);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const addDtPlayers = async (req: Request, res: Response) => {
    try {
        const body = {
            id_dt: req.body.id_dt,
            id_player: req.body.id_player
        };

        const dtPlayers = await dtPlayersService.addDtPlayers(body);
        ResponseOk(res, responses.CREATED, dtPlayers);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

const modifyDtPlayers = async (req: Request, res: Response) => {
    try {
        const body = {
            id_dt: req.body.id_dt,
            id_player: req.body.id_player
        };

        const dtPlayers = await dtPlayersService.modifyDtPlayers(Number(req.params.id), body);
        ResponseOk(res, responses.OK, dtPlayers);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

 const getPlayersByIdDt = async (req: Request, res: Response) => {
    try {
        const dtPlayers = await dtPlayersService.getPlayersByIdDt(Number(req.params.id_dt));
        ResponseOk(res, responses.OK, dtPlayers);
    } catch (error: any) {
        console.error(error);
        ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
    }
};

export const dtPlayersController = {
    getAll,
    getByID,
    addDtPlayers,
    modifyDtPlayers,
    getPlayersByIdDt
};