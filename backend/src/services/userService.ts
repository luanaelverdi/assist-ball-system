
import { UserType, PublicUsers } from "../database/models/User";
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
    return (!query.search || user.fullname_user.toLowerCase().includes(query.search.toLowerCase()));
  });

  return results;
};

export const searchUserWithEmail = async (email: string) => {
  const users = await userRepository.searchUserWithEmail(email);
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
  dni_user: number;
  fullname_user: string;
  email_user: string;
  pass_user: string;
  category_user: string;
  type_user: UserType;
}): Promise<void> => {
  // Validaciones de entrada
  userValidator.validateName(body.fullname_user);
  userValidator.validatePassword(body.pass_user);
  userValidator.validateEmail(body.email_user);
  userValidator.validateType(body.type_user);
  userValidator.validateDNI(body.dni_user);
  userValidator.validateCategory(body.category_user);

  // Encriptar contraseña
  body.pass_user = Password.hash(body.pass_user);

  // Verificar si el email ya existe (fuera de la transacción)
  const existingUser = await Postgres.query()`
    SELECT 1 FROM users WHERE email_user = ${body.email_user};
  `;
  if (existingUser.length > 0) {
    throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");
  }

  // Iniciar transacción
  await Postgres.query().begin(async sql => {
    try {
      await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
      
      const insertedUser = await sql`
        INSERT INTO users (
          dni_user,
          fullname_user, 
          email_user, 
          pass_user,
          category_user,
          type_user,
          state_user,
          fecha_alta_user,
          fecha_baja_user
        )
        VALUES (
          ${body.dni_user},
          ${body.fullname_user},
          ${body.email_user},
          ${body.pass_user},
          ${body.category_user},
          ${body.type_user},
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
  dni_user: number | null;
  fullname_user: string | null;
  email_user: string | null;
  pass_user: string | null;
  type_user: UserType | null;
  category_user: string | null;
};

const modify = async (id: number, body: BodyModificarUsuarioAdmin) => {
  if (body.dni_user) userValidator.validateDNI(body.dni_user);
  if (body.fullname_user) userValidator.validateName(body.fullname_user);
  if (body.pass_user) userValidator.validatePassword(body.pass_user);
  if (body.pass_user) body.pass_user = Password.hash(body.pass_user);
  if (body.email_user) userValidator.validateEmail(body.email_user);
  if (body.type_user) userValidator.validateType(body.type_user);
  if (body.category_user) userValidator.validateCategory(body.category_user);

  const user = await userRepository.getByID(id);
  if (!user) throw new ErrorRecursoNoEncontrado("No se ha encontrado al usuario.");

  const userWithEmail = await Postgres.query()`
    SELECT * FROM users WHERE email_user = ${body.email_user} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");

  await userRepository.modify(id, body);
}

type BodyModificarNombre = {
  nombre: string;
}

export const modifyName = async (user: PublicUsers, body: BodyModificarNombre) => {
  if (!body.nombre) throw new ErrorArgumentoInvalido("Se debe proporcionar el nuevo nombre.");
  userValidator.validateName(body.nombre);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  await userRepository.modifyName(user.id_user, body.nombre);

}

export const modifyPassword = async (user: PublicUsers, body: { pass: string }) => {
  if (!body.pass) throw new ErrorArgumentoInvalido("Se debe proporcionar la nueva contraseña.");
  userValidator.validatePassword(body.pass);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  body.pass = Password.hash(body.pass);
  await userRepository.modifyPassword(user.id_user, body.pass);

}

export const modifyEmail = async (user: PublicUsers, body: { email: string }) => {
  if (!body.email) throw new ErrorArgumentoInvalido("Se debe proporcionar el nuevo correo.");
  userValidator.validateEmail(body.email);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  const userWithEmail = await Postgres.query()`
    SELECT * FROM users WHERE email_user = ${body.email} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");
  await userRepository.modifyEmail(user.id_user, body.email);
}

export const userService = {
  getAll, 
  searchUserWithEmail,
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