 export interface Pantalla {
   id_pantalla: number;
   tipo_usuario: string;
   nombre: string;
   path: string;
   path_imagen: string;
   nombre_icono: string;
 }

export interface Users extends Record<string, unknown> {
  id_user: number,
  dni_user: number,
  fullname_user: string,
  email_user: string,
  category_user: string,
  type_user: string,
  state_user: string,
  fecha_alta_user: Date,
  fecha_baja_user: Date | null
}

export interface CreateUsers extends Record<string, unknown> {
  email: string,
  password: string,
  type: string;
}

export interface Assistance extends Record<string, unknown> {
  id_assistance: number,
  date: Date,
  entry_time: Date;
}

export interface Notification extends Record<string, unknown> {
  id_notification: number,
  description: string;
}

export interface UsersWithData {
  user: Users;
}

