import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { Notification } from "../models/Notification";
import Postgres from "../Postgres";

export const getAll = async (): Promise<Array<Notification>> => {
    const query: Array<Notification> = await Postgres.query()`
        SELECT 
            id_notification,
            description
        FROM 
            notification
        ORDER BY
            id_notification
        DESC;
    `;
    return query;
};

export const getByID = async (id: number): Promise<Notification | null> => {
    const query: Array<Notification> = await Postgres.query()`SELECT * FROM notification WHERE id_notification = ${id};`;
    return query[0];
};

export const addNotification = async (body: {
    description: string
}) => {
    try {
        const query = await Postgres.query()`
      INSERT INTO 
        notification (
          description
        ) 
      VALUES (
        ${body.description}
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

export const modifyNotification = async (id: number, body: {
    description: string
}) => {
    try {
        await Postgres.query()`UPDATE notification SET description = ${body.description} WHERE id_notification = ${id};`;
    } catch (error) {
        console.error(error);
        if (error instanceof ErrorGenerico) throw error;
        else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
    }
}

export const notificationRepository = {
    getAll,
    getByID,
    addNotification,
    modifyNotification
};