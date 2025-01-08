export type User = {
    id_user: number;
    dni: number;
    full_name: string;
    email: string;
    password: string;
    category: string;
    user_type: UserType;
    user_state: UserState;
    fecha_alta: Date;
    fecha_baja: Date;
}

export type PublicUser = {
    id_user: number;
    dni: number;
    full_name: string;
    email: string;
    category: string;
    user_type: UserType;
    user_state: UserState;
    fecha_alta: Date;
    fecha_baja: Date;
}

export type UserType = 'dt' | 'player' | 'admin';
export type UserState = 'alta' | 'baja';