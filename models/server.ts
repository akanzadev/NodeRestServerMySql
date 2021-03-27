import express, { Application, Request, Response } from "express";
import userRoutes from "../routes/usuario";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import db from "../db/connection";
class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Definir middlewares
    this.middlewares();
    // Ruta 404
    this.redirect404();
    // Definiendorutas
    this.routes();
    // Iniciar db
    this.dbConnection();
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("database online");
      await db.sync({ force: false });
      console.log("All models were synchronized successfully.");
    } catch (e) {
      throw new Error("Error con base de datos : " + e);
    }
  }
  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura de body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // Carpeta publica
    this.app.use(express.static("public"));
    // Morgan para peticiones HTTP
    this.app.use(morgan("dev"));
  }
  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
  redirect404() {
    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "../public/index.html"));
    });
  }
}

export default Server;
