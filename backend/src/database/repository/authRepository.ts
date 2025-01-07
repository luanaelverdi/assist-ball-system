import { UserType } from "../models/User";
import Postgres from "../Postgres";

const obtenerRolPorId = async (id_user: number): Promise<UserType> => {
    const query = await Postgres.query()`SELECT user_type FROM usuario WHERE id_user = ${id_user};`;
    return query[0].user_type;
}

export const authRepository = {
    obtenerRolPorId
}