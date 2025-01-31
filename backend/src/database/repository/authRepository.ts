import { TypeUser } from "../models/Users";
import Postgres from "../Postgres";

const obtenerRolPorId = async (id: number): Promise<TypeUser> => {
    console.log("id obtenido en repo aith:", id);
    const query = await Postgres.query()`SELECT type_user FROM users WHERE id_user = ${id};`;
    console.log("query obtenido en repo aith:", query);
    return query[0].type_user;
}

export const authRepository = {
    obtenerRolPorId
}