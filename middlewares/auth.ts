import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/auth";
import Usuario from "../models/usuario";
// Middleward de verificacion de token
export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.get("Authorization")) {
    try {
      const token = req.get("Authorization") || "";
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as DataStoredInToken;
      const id = decoded._id;
      const user = await Usuario.findByPk(id);
      if (user) {
        req.user = user;
        next();
      }
      return res.status(401).json({ ok: false, msg: "Access denied" });
    } catch (error) {
      return res.status(500).json({ ok: false, msg: error });
    }
  } else {
    return res.status(401).json({ ok: false, msg: "Access denied" });
  }
};
