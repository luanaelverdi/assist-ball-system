import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { DtPlayers } from "../models/DtPlayers";
import Postgres from "../Postgres";

export const getAll = async (): Promise<Array<DtPlayers>> => {
    const query: Array<DtPlayers> = await Postgres.query()`
        SELECT 
            id_dt_players,
            id_dt,
            id_player
        FROM 
            dt_players
        ORDER BY
            id_dt_players
        DESC;
    `;
    return query;
};

export const getByID = async (id: number): Promise<DtPlayers | null> => {
    const query: Array<DtPlayers> = await Postgres.query()`SELECT * FROM dt_players WHERE id_dt_players = ${id};`;
    return query[0];
};

export const addDtPlayers = async (body: {
    id_dt: number,
    id_player: number
}) => {
    try {
        const query = await Postgres.query()`
      INSERT INTO 
        dt_players (
          id_dt,
          id_player
        ) 
      VALUES (
        ${body.id_dt},
        ${body.id_player}
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

export const modifyDtPlayers = async (id: number, id_dt: number | null , id_player: number | null, body: {
    id_dt: number,
    id_player: number
}) => {
    try {
        await Postgres.query()`UPDATE dt_players SET id_dt = ${body.id_dt} WHERE id_dt_players = ${id};`;
        await Postgres.query()`UPDATE dt_players SET id_player = ${body.id_player} WHERE id_dt_players = ${id};`;
    } catch (error) {
        console.error(error);
        if (error instanceof ErrorGenerico) throw error;
        else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
    }
}

export const dtPlayersRepository = {
    getAll,
    getByID,
    addDtPlayers,
    modifyDtPlayers
};