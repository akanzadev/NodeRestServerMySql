import { Request, Response } from "express";
import Usuario from "../models/usuario";
import UserI from '../interfaces/user';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json({
    usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  usuario ? res.status(200).json(usuario) : res.status(404).json(usuario);
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(req.body);
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });
    if (existeEmail) {
      res
        .status(404)
        .json({ msg: "Ya existe un usuario con ese email" + body.email });
    }
    const usuario = new Usuario(body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: "getUsuario",
    body,
  });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "getUsuario",
    id,
  });
};
