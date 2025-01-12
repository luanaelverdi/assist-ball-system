import { assistanceRepository } from "../database/repository/assistenceRepository";

const fetch = require('node-fetch');

const getAll = async (query: {
    search: string | null
}) => {
    const assis = await assistanceRepository.getAll();

    const results = assis.filter(a => {
        return (!query.search || a.date.toDateString().includes(query.search.toLowerCase()));
    });

    return results;
};

export const getByID = async (id: number) => {
    const assis = await assistanceRepository.getByID(id);
    return assis;
};

export const getByDates = async (date: Date) => {
    const assis = await assistanceRepository.getByDates(date);
    return assis;
};


export const add = async (body: {
    date: Date,
    entry_time: Date
}) => {
    const assistance = await assistanceRepository.add(body);
    return assistance;
};

export const assistanceService = {
    getAll,
    getByDates,
    getByID,
    add
};