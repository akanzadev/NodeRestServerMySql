import { DataTypes, ModelCtor } from "sequelize";
import db from "../db/connection";

const Usuario = db.define("Usuario", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

export default Usuario;
