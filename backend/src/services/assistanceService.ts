import { assistanceRepository } from "../database/repository/assistenceRepository";

const fetch = require('node-fetch');

export const getAll = async (query: {
    search: string | null
}) => {
    const assis = await assistanceRepository.getAll();

    const results = assis.filter(a => {
        return (!query.search || a.date.toDateString().includes(query.search.toLowerCase()));
    });

    return results;
};

export const getByID = async (id: number) => {
    console.log("Valor de id asistencia recibido en service:", id);
    const assis = await assistanceRepository.getByID(id);
    return assis;
};

export const getByID_player = async (id: number) => {
    console.log("Valor de id player recibido en service:", id);
    const assis = await assistanceRepository.getByID_Player(id);
    return assis;
};

export const getByID_dt = async (id_dt: number) => {
    console.log("Valor de id dta recibido en service:", id_dt);
    const assis = await assistanceRepository.getByID_dt(id_dt);
    return assis;
};

export const getByDates = async (date: Date) => {
    const assis = await assistanceRepository.getByDates(date);
    return assis;
};


export const add = async (body: {
    date: Date,
    entry_time: string,
    id_player: number,
    id_dt: number
}) => {
    console.log("body service: ", body)
    const assistance = await assistanceRepository.add(body);
    return assistance;
};

export const assistanceService = {
    getAll,
    getByDates,
    getByID,
    add,
    getByID_player,
    getByID_dt
};