import { dtPlayersRepository } from "../database/repository/dtPlayersRepository";

const fetch = require('node-fetch');

const getAll = async (query: {
    search: string | null
}) => {
    const dtPlayers = await dtPlayersRepository.getAll();

    const results = dtPlayers.filter(dtPlayers => {
        return (!query.search || dtPlayers.id_dt_players.toString().includes(query.search.toLowerCase()));
    });

    return results;
};

export const getByID = async (id: number) => {
    const dtPlayers = await dtPlayersRepository.getByID(id);
    return dtPlayers;
};

export const addDtPlayers = async (body: {
    id_dt: number,
    id_player: number
}) => {
    const dtPlayers = await dtPlayersRepository.addDtPlayers(body);
    return dtPlayers;
};

export const modifyDtPlayers = async (id: number, id_dt: number | null , id_player: number | null, body: {
    id_dt: number,
    id_player: number
}) => {
    const dtPlayers = await dtPlayersRepository.modifyDtPlayers(id, body.id_dt, body.id_player, body);
    return dtPlayers;
};

export const dtPlayersService = {
    getAll,
    getByID,
    addDtPlayers,
    modifyDtPlayers
};