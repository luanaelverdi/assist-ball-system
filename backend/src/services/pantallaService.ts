import { Pantalla } from "../database/models/Path";
import { pantallaRepository } from "../database/repository/pantallaRepository";

export const buscarPorTipo = async (tipo: string): Promise<Array<Pantalla>> => {
    const pantallas = await pantallaRepository.buscarPorTipo(tipo);
    return pantallas;
};

export const buscarPorTipoConPadre = async (tipo: string, padre: string) => {
    const pantallas = await pantallaRepository.buscarPorTipoConPadre(tipo, padre);
    return pantallas;
}

export const pantallaService = {
    buscarPorTipo,
    buscarPorTipoConPadre
}