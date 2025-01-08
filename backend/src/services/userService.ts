
import { UserType, PublicUser } from "../database/models/User";
import Postgres from "../database/Postgres";
import { userRepository } from "../database/repository/userRepository";
import ErrorNoDisponible from "../errors/ErrorNoDisponible";
import ErrorArgumentoInvalido from "../errors/ErrorArgumentoInvalido";
import ErrorGenerico from "../errors/ErrorGenerico";
import ErrorRecursoNoEncontrado from "../errors/ErrorRecursoNoEncontrado";
import Password from "../helpers/Password";
import { userValidator } from "../validations/userValidator";


const fetch = require('node-fetch');

const getAll = async (query: {
  search: string | null
}) => {
  const users = await userRepository.getAll();

  const results = users.filter(user => {
    return (!query.search || user.full_name.toLowerCase().includes(query.search.toLowerCase()));
  });

  return results;
};

export const searchUserwithEmail = async (email: string) => {
  const users = await userRepository.searchUserwithEmail(email);
  return users;
};

export const getByID = async (id: number) => {
  const users = await userRepository.getByID(id);
  return users;
};

export const searchUserByType = async (type: string) => {
  const users = await userRepository.searchUserByType(type);
  return users;
};

export const getPasswordUser = async (id: number) => {
  const users = await userRepository.getPasswordUser(id);
  return users;
};

const add = async (id_user: number, body: {
  dni: number;
  full_name: string;
  email: string;
  password: string;
  category: string;
  user_type: UserType;
}): Promise<void> => {
  // Validaciones de entrada
  userValidator.validateName(body.full_name);
  userValidator.validatePassword(body.password);
  userValidator.validateEmail(body.email);
  userValidator.validateType(body.user_type);
  userValidator.validateDNI(body.dni);
  userValidator.validateCategory(body.category);

  // Encriptar contraseña
  body.password = Password.hash(body.password);

  // Verificar si el email ya existe (fuera de la transacción)
  const existingUser = await Postgres.query()`
    SELECT 1 FROM user WHERE email = ${body.email};
  `;
  if (existingUser.length > 0) {
    throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");
  }

  // Iniciar transacción
  await Postgres.query().begin(async sql => {
    try {
      await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
      
      const insertedUser = await sql`
        INSERT INTO user (
          dni,
          full_name, 
          email, 
          password,
          category,
          user_type,
          user_state,
          fecha_alta,
          fecha_baja
        )
        VALUES (
          ${body.dni},
          ${body.full_name},
          ${body.email},
          ${body.password},
          ${body.category},
          ${body.user_type},
          'alta',
          CURRENT_DATE,
          null
        )
        RETURNING *;
      `;
      
      console.log("Usuario creado:", insertedUser);
    } catch (error) {
      console.error("Error durante la transacción:", error);
      if (error instanceof ErrorGenerico) throw error;
      throw new ErrorNoDisponible("Ha ocurrido un error con TRACCAR.");
    }
  });
};


export const deleteUser = async (id: number) => {
  const user = await userRepository.getByID(id);
  if (!user) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");

  await userRepository.deleteUser(id);
}

export type BodyModificarUsuarioAdmin = {
  dni: number | null;
  full_name: string | null;
  email: string | null;
  password: string | null;
  user_type: UserType | null;
  category: string | null;
};

const modify = async (id: number, body: BodyModificarUsuarioAdmin) => {
  if (body.dni) userValidator.validateDNI(body.dni);
  if (body.full_name) userValidator.validateName(body.full_name);
  if (body.password) userValidator.validatePassword(body.password);
  if (body.password) body.password = Password.hash(body.password);
  if (body.email) userValidator.validateEmail(body.email);
  if (body.user_type) userValidator.validateType(body.user_type);
  if (body.category) userValidator.validateCategory(body.category);

  const user = await userRepository.getByID(id);
  if (!user) throw new ErrorRecursoNoEncontrado("No se ha encontrado al usuario.");

  const userWithEmail = await Postgres.query()`
    SELECT * FROM user WHERE email = ${body.email} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");

  await userRepository.modify(id, body);
}

type BodyModificarNombre = {
  nombre: string;
}

export const modifyName = async (user: PublicUser, body: BodyModificarNombre) => {
  if (!body.nombre) throw new ErrorArgumentoInvalido("Se debe proporcionar el nuevo nombre.");
  userValidator.validateName(body.nombre);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  await userRepository.modifyName(user.id_user, body.nombre);

}

export const modifyPassword = async (user: PublicUser, body: { pass: string }) => {
  if (!body.pass) throw new ErrorArgumentoInvalido("Se debe proporcionar la nueva contraseña.");
  userValidator.validatePassword(body.pass);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  body.pass = Password.hash(body.pass);
  await userRepository.modifyPassword(user.id_user, body.pass);

}

export const modifyEmail = async (user: PublicUser, body: { email: string }) => {
  if (!body.email) throw new ErrorArgumentoInvalido("Se debe proporcionar el nuevo correo.");
  userValidator.validateEmail(body.email);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  const userWithEmail = await Postgres.query()`
    SELECT * FROM user WHERE email = ${body.email} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");
  await userRepository.modifyEmail(user.id_user, body.email);
}

export const userService = {
  getAll, 
  searchUserwithEmail,
  searchUserByType,
  getByID,
  getPasswordUser,
  add,
  modify,
  modifyName,
  modifyPassword,
  modifyEmail,
  deleteUser
};