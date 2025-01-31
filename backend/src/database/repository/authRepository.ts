import { TypeUser } from "../models/Users";
import Postgres from "../Postgres";

const obtenerRolPorId = async (id: number): Promise<TypeUser> => {
    const query = await Postgres.query()`SELECT type_user FROM users WHERE id_user = ${id};`;
    return query[0].type_user;
}

export const authRepository = {
    obtenerRolPorId
}