import ErrorBaseDeDatos from "../../errors/ErrorBaseDeDatos";
import ErrorGenerico from "../../errors/ErrorGenerico";
import { BodyModificarUsuarioAdmin } from "../../services/userService";
import { User, PublicUser } from "../models/User";
import Postgres from "../Postgres";

export const getAll = async (): Promise<Array<User>> => {
  const query: Array<User> = await Postgres.query()`
    SELECT  
      id_user,
      dni,
      full_name,
      email,
      category,
      user_type,
      user_state,
    FROM 
      user
    ORDER BY
      id_user
    DESC;
  `;
  return query;
};

export const searchUserwithEmail = async (email: string): Promise<User | null> => {
  try {
    const query: Array<User> = await Postgres.query()`SELECT * FROM user WHERE email = ${email};`;
    return query[0];
  } catch (error) {
    if (error instanceof ErrorGenerico) throw error;
    else {
      console.error(error);
      throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
    }
  }
};

export const searchUserByType = async (type: string): Promise<Array<User>> => {
  const query: Array<User> = await Postgres.query()`SELECT * FROM user WHERE user_type = ${type} AND user_state = 'alta';`;
  return query;
};

export const getByID = async (id: number): Promise<User | null> => {
  const query: Array<User> = await Postgres.query()`SELECT * FROM user WHERE id_user = ${id};`;
  return query[0];
};

export const getPasswordUser = async (id: number): Promise<string> => {
  const query: Array<any> = await Postgres.query()`SELECT password FROM user WHERE id_user = ${id};`;
  return query[0];
};

export const add = async (body: {
  dni: number,
  full_name: string,
  email: string,
  password: string,
  category: string,
  user_type: string
}) => {
  try {
    const query = await Postgres.query()`
      INSERT INTO 
        user (
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
        null,
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
      if (body.dni) await sql`UPDATE user SET dni = ${body.dni} WHERE id_user = ${id};`;
      if (body.full_name) await sql`UPDATE user SET full_name = ${body.full_name} WHERE id_user = ${id};`;
      if (body.email) await sql`UPDATE user SET email = ${body.email} WHERE id_user = ${id};`;
      if (body.password) await sql`UPDATE user SET password = ${body.password} WHERE id_user = ${id};`;
      if (body.user_type) await sql`UPDATE user SET user_type = ${body.user_type} WHERE id_user = ${id};`;
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyName = async (id: number, name: string) => {
  try {
    await Postgres.query()`UPDATE user SET full_name = ${name} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyPassword = async (id: number, pass: string) => {
  try {
    await Postgres.query()`UPDATE user SET password = ${pass} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyEmail = async (id: number, email: string) => {
  try {
    await Postgres.query()`UPDATE user SET email = ${email} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyDNI = async (id: number, dni: string) => {
  try {
    await Postgres.query()`UPDATE user SET dni = ${dni} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const modifyCategory = async (id: number, cat: string) => {
  try {
    await Postgres.query()`UPDATE user SET category = ${cat} WHERE id_user = ${id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const deleteUser = async (_id: number) => {
  try {
    await Postgres.query()`
      UPDATE 
        user 
      SET 
        user_state = 'baja',
        fecha_baja= CURRENT_DATE
      WHERE 
        id_user = ${_id};`;
  } catch (error) {
    console.error(error);
    if (error instanceof ErrorGenerico) throw error;
    else throw new ErrorBaseDeDatos("Ha ocurrido un error con la base de datos.");
  }
}

export const userRepository = {
  getAll,
  getByID,
  searchUserwithEmail,
  searchUserByType,
  getPasswordUser,
  add,
  modify,
  modifyName,
  modifyPassword,
  modifyEmail,
  modifyDNI,
  modifyCategory, 
  deleteUser
};