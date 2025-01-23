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
    console.log("Valor de id asistencia recibido en service:", id);
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

export const modifyDtPlayers = async (id: number, body: {
    id_dt: number,
    id_player: number
}) => {
    const dtPlayers = await dtPlayersRepository.modifyDtPlayers(id, body);
    return dtPlayers;
};

export const dtPlayersService = {
    getAll,
    getByID,
    addDtPlayers,
    modifyDtPlayers
};