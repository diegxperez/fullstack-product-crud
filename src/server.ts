import express, { Express } from "express";
import pc from "picocolors";
import db from "./config/db";
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

const server: Express = express();
server.use(express.json());

server.use("/api/products", productsRouter);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

export default server;