export type Users = {
    id_user: number;
    dni_user: number;
    fullname_user: string;
    email_user: string;
    pass_user: string;
    category_user: string;
    type_user: UserType;
    state_user: UserState;
    fecha_alta_user: Date;
    fecha_baja_user: Date;
}

export type PublicUsers = {
    id_user: number;
    dni_user: number;
    fullname_user: string;
    email_user: string;
    category_user: string;
    type_user: UserType;
    state_user: UserState;
    fecha_alta_user: Date;
    fecha_baja_user: Date;
}

export type UserType = 'dt' | 'player' | 'admin';
export type UserState = 'alta' | 'baja';