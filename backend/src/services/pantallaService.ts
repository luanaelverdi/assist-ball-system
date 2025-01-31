import { Pantalla } from "../database/models/Path";
import { pantallaRepository } from "../database/repository/pantallaRepository";

export const buscarPorTipo = async (type: string): Promise<Array<Pantalla>> => {
    const pantallas = await pantallaRepository.buscarPorTipo(type);
    return pantallas;
};

export const buscarPorTipoConPadre = async (type: string, padre: string) => {
    const pantallas = await pantallaRepository.buscarPorTipoConPadre(type, padre);
    return pantallas;
}

export const pantallaService = {
    buscarPorTipo,
    buscarPorTipoConPadre
}