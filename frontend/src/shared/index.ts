export interface Users extends Record<string, unknown> {
    id_user: number;
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
    fullname_user: string;
    email_user: string;
    password_user: string;
    type_user: string;
    category_user: string;
}

export interface UsersWithData extends Record<string, unknown> {
    user: Users;
}