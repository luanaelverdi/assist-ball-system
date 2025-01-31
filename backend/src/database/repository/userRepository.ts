import ErrorArgumentoInvalido from "../../errors/ErrorArgumentoInvalido";
import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { BodyModificarUsuarioAdmin } from "../../services/userService";
import { Users, PublicUsers } from "../models/Users";
import Postgres from "../Postgres";
const QRCode = require("qrcode");

export const getAll = async (): Promise<Array<Users>> => {
  const query: Array<Users> = await Postgres.query()`
    SELECT  
      id_user,
      dni_user,
      fullname_user,
      email_user,
      category_user,
      type_user,
      state_user
    FROM 
      users
    ORDER BY
      id_user
    DESC;
  `;
  return query;
};

export const searchUserWithEmail = async (email: string): Promise<Users | null> => {
  try {
    const query: Array<Users> = await Postgres.query()`SELECT * FROM users WHERE email_user = ${email};`;
    return query[0];
  } catch (error) {
    if (error instanceof ErrorGenerico) throw error;
    else {
      console.error(error);
      throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
    }
  }
};

export const searchUserByType = async (type: string): Promise<Users[]> => {
  const query: Array<Users> = await Postgres.query()`SELECT * FROM users WHERE type_user = ${type} AND state_user = 'alta';`;
  return query;

};

export const searchUserByDNI = async (dni: number): Promise<Users | null> => {
  const query: Array<Users> = await Postgres.query()`SELECT * FROM users WHERE dni_user = ${dni} AND state_user = 'alta';`;
  return query[0];

};
export const getByID = async (id: number): Promise<Users> => {
  console.log("id obtenido en repo 1:", id);
  console.log(Promise.resolve(id));
  console.log( Promise<Users>);
  const query: Array<Users> = await Postgres.query()`SELECT * FROM users WHERE id_user = ${id};`;
  return query[0];
}
export const getPasswordUser = async (id: number): Promise<string> => {
  const query: Array<any> = await Postgres.query()`SELECT pass_user FROM users WHERE id_user = ${id};`;
  return query[0];
};

export const add = async (body: {
  dni: number,
  fullname: string,
  email: string,
  pass: string,
  category: string,
  type: string
}) => {
  try {
    const query = await Postgres.query()`
      INSERT INTO 
        users (
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
        ${body.dni}, 
        ${body.fullname.toLowerCase()}, 
        ${body.email}, 
        ${body.pass}, 
        ${body.category},
        ${body.type},
        'alta',
        CURRENT_DATE,
        null
      )
      RETURNING *
    ;`;

    return query[0];
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
};

export const modify = async (id: number, body: BodyModificarUsuarioAdmin) => {
  try {
    await Postgres.query().begin(async sql => {
      await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
      if (body.dni_user) await sql`UPDATE users SET dni_user = ${body.dni_user} WHERE id_user = ${id};`;
      if (body.fullname_user) await sql`UPDATE users SET fullname_user = ${body.fullname_user} WHERE id_user = ${id};`;
      if (body.email_user) await sql`UPDATE users SET email_user = ${body.email_user} WHERE id_user = ${id};`;
      if (body.pass_user) await sql`UPDATE users SET pass_user = ${body.pass_user} WHERE id_user = ${id};`;
      if (body.type_user) await sql`UPDATE users SET type_user = ${body.type_user} WHERE id_user = ${id};`;
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyName = async (id: number, name: string) => {
  try {
    await Postgres.query()`UPDATE users SET fullname_user = ${name} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyPassword = async (id: number, pass: string) => {
  try {
    await Postgres.query()`UPDATE users SET pass_user = ${pass} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyEmail = async (id: number, email: string) => {
  try {
    await Postgres.query()`UPDATE users SET email_user = ${email} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyDNI = async (id: number, dni: number) => {
  try {
    await Postgres.query()`UPDATE users SET dni_user = ${dni} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyCategory = async (id: number, cat: string) => {
  try {
    await Postgres.query()`UPDATE users SET category_user = ${cat} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const deleteUser = async (id: number) => {
  try {
    await Postgres.query()`
      UPDATE 
        users 
      SET 
        state_user = 'baja',
        fecha_baja_user= CURRENT_DATE
      WHERE 
        id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const getQR = async (id: number): Promise<Users> => {
  const query: Array<Users> = await Postgres.query()`SELECT id_user FROM users WHERE id_user = ${id};`;
  const qrCodeData = await QRCode.toDataURL(query);
  return qrCodeData;
}

export const userRepository = {
  getAll,
  getByID,
  searchUserWithEmail,
  searchUserByType,
  searchUserByDNI,
  getPasswordUser,
  add,
  modify,
  modifyName,
  modifyPassword,
  modifyEmail,
  modifyDNI,
  modifyCategory,
  deleteUser,
  getQR
};