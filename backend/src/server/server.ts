import fastify from "fastify";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { AuthRoute } from "../routes/AuthRoute.ts";
import cookie from "@fastify/cookie";
import { CompanyRoute } from "../routes/CompanyRoute.ts";
import cors from "@fastify/cors";
import { errorHandler } from "../middlewares/errorHandler.ts";

const app = fastify();

dotenv.config();

app.register(cookie);
app.setErrorHandler(errorHandler);
const connect = async () => {
  try {
    if (!process.env.MONGO) return;
    await mongoose.connect(process.env.MONGO);
  } catch (err) {
    console.error("Erro ao conectar no banco de dados", err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB desconectado!");
});

app.register(cors, {
  origin: process.env.FRONTEND, // Link do Front
  methods: "*",
  allowedHeaders: "*",
});

app.register(AuthRoute, { prefix: "/auth" });
app.register(CompanyRoute, { prefix: "/company" });

app.listen({ port: 8080 }).then(() => {
  connect();
  console.log("Servidor está rodando na porta 8080");
});
