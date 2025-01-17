
import { TypeUser, PublicUsers } from "../database/models/User";
import Postgres from "../database/Postgres";
import { userRepository } from "../database/repository/userRepository";
import ErrorNoDisponible from "../errors/ErrorNoDisponible";
import ErrorArgumentoInvalido from "../errors/ErrorArgumentoInvalido";
import ErrorGenerico from "../errors/ErrorGenerico";
import ErrorRecursoNoEncontrado from "../errors/ErrorRecursoNoEncontrado";
import Password from "../helpers/Password";
import { userValidator } from "../validations/userValidator";


const fetch = require('node-fetch');

export const getAll = async (query: {
  search: string | null
}) => {
  const users = await userRepository.getAll();

  const results = users.filter(user => {
    return (!query.search || user.fullname_user.toLowerCase().includes(query.search.toLowerCase()));
  });

  return results;
};

export const getByID = async (id: number) => {
  const users = await userRepository.getByID(id);
  if (!users) throw new ErrorRecursoNoEncontrado("El id de usuario no existe.");
  return users;
};

export const searchUserWithEmail = async (mail: string) => {
  const users = await userRepository.searchUserWithEmail(mail);
  if (!users) throw new ErrorRecursoNoEncontrado("El correo ingresado no existe.");
  return users;
};

export const searchUserByType = async (type: string) => {
  userValidator.validateType(type);
  const users = await userRepository.searchUserByType(type);
  return users;
};

export const searchUserByDNI = async (dni: number) => {
  const users = await userRepository.searchUserByDNI(dni);
  if (!users) throw new ErrorRecursoNoEncontrado("El dni ingresado no existe.");
  return users;
};

export const searchUserByName = async (name: string) => {
  const users = await userRepository.searchUserByName(name);
  if (!users) throw new ErrorRecursoNoEncontrado("El nombre ingresado no existe.");
  return users;
};

export const getPasswordUser = async (id: number) => {
  const users = await userRepository.getPasswordUser(id);
  return users;
};

const add = async (body: {
  dni_user: number;
  fullname_user: string;
  email_user: string;
  password_user: string;
  category_user: string;
  type_user: TypeUser;
}) => {
  console.log(body);
  console.log(body.password_user + "probando contraseña");
  // Validaciones de entrada
  userValidator.validateName(body.fullname_user);
  userValidator.validatePassword(body.password_user);
  userValidator.validateEmail(body.email_user);
  userValidator.validateType(body.type_user);
  userValidator.validateDNI(body.dni_user);
  userValidator.validateCategory(body.category_user);
  body.password_user = Password.hash(body.password_user);

  console.log(body.password_user + "PASS HASH");

  await userValidator.validarEmailRepetido(body.email_user, null);

  await Postgres.query().begin(async sql => {
    await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;

    const qUsuario = await sql`
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
        ${body.password_user},
        ${body.category_user},
        ${body.type_user},
        'alta',
        CURRENT_DATE,
        null
      )
      RETURNING *;
    `;

    console.log("Usuario creado:", qUsuario);
  });
};


export const deleteUser = async (id: number) => {
  const user = await userRepository.getByID(id);
  if (!user) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");

  await userRepository.deleteUser(id);
}

export type BodyModificarUsuarioAdmin = {
  dni: number | null;
  fullname: string | null;
  email: string | null;
  pass: string | null;
  type: TypeUser | null;
  category: string | null;
};

const modify = async (id: number, body: BodyModificarUsuarioAdmin) => {
  if (body.dni) userValidator.validateDNI(body.dni);
  if (body.fullname) userValidator.validateName(body.fullname);
  if (body.pass) userValidator.validatePassword(body.pass);
  if (body.pass) body.pass = Password.hash(body.pass);
  if (body.email) userValidator.validateEmail(body.email);
  if (body.type) userValidator.validateType(body.type);
  if (body.category) userValidator.validateCategory(body.category);
  if (body.email) await userValidator.validarEmailRepetido(body.email, id);

  const user = await userRepository.getByID(id);
  if (!user) throw new ErrorRecursoNoEncontrado("No se ha encontrado al usuario.");

  const userWithEmail = await Postgres.query()`
    SELECT * FROM users WHERE email_user = ${body.email} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");

  await userRepository.modify(id, body);
}

type BodyModificarNombre = {
  nombre: string;
}

export const modifyName = async (user: PublicUsers, body: BodyModificarNombre) => {
  userValidator.validateName(body.nombre);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  await userRepository.modifyName(user.id_user, body.nombre);

}

export const modifyPassword = async (user: PublicUsers, body: { pass: string }) => {
  userValidator.validatePassword(body.pass);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  body.pass = Password.hash(body.pass);
  await userRepository.modifyPassword(user.id_user, body.pass);

}

export const modifyEmail = async (user: PublicUsers, body: { email: string }) => {
  userValidator.validateEmail(body.email);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  const userWithEmail = await Postgres.query()`
    SELECT * FROM users WHERE email_user = ${body.email} AND id_user != ${user.id_user};
  `;
  if (userWithEmail[0]) throw new ErrorArgumentoInvalido("Ese correo ya está siendo utilizado.");
  await userRepository.modifyEmail(user.id_user, body.email);
}

export const modifyDNI = async (user: PublicUsers, body: { dni: number }) => {
  userValidator.validateDNI(body.dni);
  const existeUsuario = await userRepository.getByID(user.id_user);
  if (!existeUsuario) throw new ErrorRecursoNoEncontrado("Usuario no encontrado.");
  await userRepository.modifyDNI(user.id_user, body.dni);
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
  deleteUser,
  modifyDNI,
  searchUserByDNI,
  searchUserByName
};