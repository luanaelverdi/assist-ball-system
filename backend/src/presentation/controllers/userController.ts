import { Request, response, Response } from "express";
import { userService } from "../../services/userService";
import { ResponseError, ResponseOk } from "../../helpers/ControllerResponse";
import responses from "../../static/responses";
import ErrorNoAutorizado from "../../errors/ErrorNoAutorizado";
import ErrorGenerico from "../../errors/ErrorGenerico";
//import { enviarEmailBienvenidaCliente, enviarEmailBienvenidaStaff, enviarEmailCambiarContraseña } from "../../helpers/NodeMailer";
import ErrorArgumentoInvalido from "../../errors/ErrorArgumentoInvalido";
import JWT from "../../helpers/JWT";
import Postgres from "../../database/Postgres";

const getAll = async (req: Request, res: Response) => {
  const query = {
    search: req.query.search ? req.query.search as string : null
  };

  try {
    const users = await userService.getAll(query);
    ResponseOk(res, responses.OK, users);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const searchUserWithEmail = async (req: Request, res: Response) => {
  try {
    const usuarios = await userService.searchUserWithEmail(req.params.mail);
    ResponseOk(res, responses.OK, usuarios);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const searchUserByType = async (req: Request, res: Response) => {
  try {
    const usuarios = await userService.searchUserByType(req.params.type);
    console.log(req.params.type + "TYPE");
    ResponseOk(res, responses.OK, usuarios);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const getByID = async (req: Request, res: Response) => {
  try {
    const usuarios = await userService.getByID(Number(req.params.id));
    ResponseOk(res, responses.OK, usuarios);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const getPasswordUser = async (req: Request, res: Response) => {
  try {
    const usuarios = await userService.getPasswordUser(Number(req.params.id));
    ResponseOk(res, responses.OK, usuarios);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const add = async (req: Request, res: Response) => {
  try {
  
    const body = {
      dni: req.body.dni_user,
      fullname: req.body.fullname_user,
      email: req.body.email_user,
      pass: req.body.pass_user,
      category: req.body.category_user,
      type: req.body.type_user,
    };
    const response = await userService.add(body);

    ResponseOk(res, responses.CREATED, response);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await userService.deleteUser(Number(req.params.id));
    ResponseOk(res, responses.OK, response);
  } catch (error: any) {
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
}

const modify = async (req: Request, res: Response) => {
  try {
    const response = await userService.modify(req.user.id_user, {
      dni: req.body.dni_user ?? null,
      fullname: req.body.fullname_user ?? null,
      email: req.body.email_user ?? null,
      pass: req.body.pass_user ?? null,
      category: req.body.category_user ?? null,
      type: req.body.type_user ?? null
    });
    ResponseOk(res, responses.OK, response);
  } catch (error) {
    ResponseError(res, responses.BAD_REQUEST, error);
  }
}

const modifyName = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new ErrorNoAutorizado("Error de autentificacion.");
    const resultado = await userService.modifyName(req.user, req.body);
    ResponseOk(res, responses.OK, resultado);
  } catch (error: any | ErrorGenerico) {
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
}

const modifyPassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new ErrorNoAutorizado("Error de autentificacion.");
    const resultado = await userService.modifyPassword(req.user, req.body);
    ResponseOk(res, responses.OK, resultado);
  } catch (error: any) {
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const modifyPasswordWithToken = async (req: Request, res: Response) => {
  try {
    const token = String(req.query.token);
    const verificar = await JWT.verificarToken(token);
    const resultado = await userService.modifyPassword(verificar, req.body);
    ResponseOk(res, responses.OK, resultado);
  } catch (error: any) {
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const modifyEmail = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new ErrorNoAutorizado("Error de autentificacion.");
    const resultado = await userService.modifyEmail(req.user, req.body);
    ResponseOk(res, responses.OK, resultado);
  } catch (error: any) {
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
};

const getDatosWithToken = async (req: Request, res: Response) => {
  try {
    const usuario = req.user;

    const data: any = {
      usuario
    }

    ResponseOk(res, responses.OK, data);
  } catch (error: any) {
    console.error(error);
    ResponseError(res, error.statusCode || responses.INTERNAL_SERVER_ERROR, error);
  }
}

export const userController = {
  getAll,
  searchUserByType,
  getPasswordUser,
  getByID,
  searchUserWithEmail,
  deleteUser,
  add,
  modify,
  modifyName,
  modifyPassword,
  modifyPasswordWithToken,
  modifyEmail,
  getDatosWithToken
};