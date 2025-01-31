import Strings from "../../helpers/Strings";
import { Pantalla } from "../models/Path"
import Postgres from "../Postgres"

const buscarPorTipo = async (tipo: string): Promise<Array<Pantalla>> => {

    let query: Array<Pantalla> = [];
    await Postgres.query().begin(async sql => {
        await sql`SET client_encoding TO 'UTF8';`;
        query = await sql`SELECT * FROM pantalla WHERE type_user = ${tipo} and path_padre is null ORDER BY id_pantalla ASC;`;
        query.forEach(p => p.nombre = Strings.RepararAcentos(p.nombre));
    });

    return query;
}


const buscarPorTipoConPadre = async (tipo: string, padre: string): Promise<Array<Pantalla>> => {

    let query: Array<Pantalla> = [];
    await Postgres.query().begin(async sql => {
        await sql`SET client_encoding TO 'UTF8';`;
        query = await sql`SELECT * FROM pantalla WHERE type_user = ${tipo} and path_padre = ${padre} ORDER BY id_pantalla DESC;`;
        query.forEach(p => p.nombre = Strings.RepararAcentos(p.nombre));
    });

    return query;
}

export const pantallaRepository = {
    buscarPorTipo,
    buscarPorTipoConPadre
}