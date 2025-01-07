export type User ={
    id_user: number;
    dni: number;
    full_name: string;
    email: string;
    password: string;
    category: string;
    user_type: UserType;
}   

export type UserType = 'dt' | 'player';
