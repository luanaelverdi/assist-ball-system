import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { Assistance } from "../models/Assistance";
import Postgres from "../Postgres";

export const getAll = async (): Promise<Array<Assistance>> => {
    const query: Array<Assistance> = await Postgres.query()`
        SELECT 
            *
        FROM 
            assistance
        ORDER BY
            id_assistance
        DESC;
    `;
    return query;
};

export const getByID = async (id: number): Promise<Assistance | null> => {
    console.log("Valor de id asistencia recibido:", id);
    const query: Array<Assistance> = await Postgres.query()`SELECT * FROM assistance WHERE id_assistance = ${id};`;
    return query[0];
};

export const getByDates = async (date: Date | null): Promise<Array<Assistance>> => {
    const query: Array<Assistance> = await Postgres.query()`
        SELECT 
            *
        FROM 
            assistance
        WHERE
            date = ${date}
        ORDER BY
            id_assistance
        DESC;
    `;
    return query;
};

export const add = async (body: {
    date: Date,
    entry_time: string,
    id_player: number,
    id_dt: number
}) => {
    try {
        const query = await Postgres.query()`
      INSERT INTO 
        assistance (
          date, 
          entry_time,
          id_player, 
          id_dt
        ) 
      VALUES (
        CURRENT_DATE,
        ${body.entry_time}, 
        ${body.id_player},
        ${body.id_dt}
      )
      RETURNING *
    ;`;
        return query[0];
    } catch (error) {
        console.error(error);
        if (error instanceof ErrorGenerico) throw error;
        else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
    }
};

export const getByID_Player = async (id: number): Promise<Array<Assistance> | null> => {
    //console.log("Valor de id jugador recibido:", id);
    const query: Array<Assistance> = await Postgres.query()`SELECT * FROM assistance WHERE id_player = ${id};`;
    return query;
};

export const getByID_dt = async (id_dt: number): Promise<Array<Assistance> | null> => {
    const query: Array<Assistance> = await Postgres.query()`SELECT * FROM assistance WHERE id_dt = ${id_dt};`;
    return query;
};

export const assistanceRepository = {
    getAll,
    getByID,
    getByDates,
    add,
    getByID_Player,
    getByID_dt
};