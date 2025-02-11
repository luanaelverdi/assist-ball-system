export interface Pantalla {
    id_pantalla: number;
    type_user: string;
    nombre: string;
    path: string;
  }
export interface Users extends Record<string, unknown> {
    id_user: number;
    dni_user: number;
    fullname_user: string;
    email_user: string;
    password_user: string;
    type_user: string;
    category_user: string;
    state_user: string;
    fecha_alta_user: Date;
    fecha_baja_user: Date | null;
}

export interface CreateUser extends Record<string, unknown> {
    dni_user: number;
    fullname_user: string;
    email_user: string;
    password_user: string;
    category_user: string;
    type_user: string;
}

export interface UsersWithData extends Record<string, unknown> {
    user: Users;
}

export interface Assistance extends Record<string, unknown> {
    id_assistance: number;
    date: Date;
    entry_time: string;
}

export interface DtPlayers extends Record<string, unknown> {
    id_dt_players: number;
    id_dt: number;
    id_player: number;
}

export interface CreateDtPlayers extends Record<string, unknown> {
    id_dt: number;
    id_player: number;
}
