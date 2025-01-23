import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { Assistance } from "../models/Assistance";
import Postgres from "../Postgres";

export const getAll = async (): Promise<Array<Assistance>> => {
    const query: Array<Assistance> = await Postgres.query()`
        SELECT 
            id_assistance,
            date,
            entry_time
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
    entry_time: string
}) => {
    try {
        const query = await Postgres.query()`
      INSERT INTO 
        assistance (
          date, 
          entry_time
        ) 
      VALUES (
        CURRENT_DATE,
        ${body.entry_time} 
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

export const assistanceRepository = {
    getAll,
    getByID,
    getByDates,
    add
};