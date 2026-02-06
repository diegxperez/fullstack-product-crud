import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import express, { Express } from "express";
import pc from "picocolors";
import swaggerUI from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import productsRouter from "./router";

//  Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(pc.green("✅ Base de datos sincronizada"));
  } catch (error) {
    // console.log(error);
    console.log(pc.bgRed(pc.white("Hubo un error al conectar a la BD")));
  }
}

connectDB();
//  Instancia de express
const server: Express = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:4000"];

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));
// Leer datos de formularios
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", productsRouter);

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
