import { FastifyInstance } from "fastify";
import { Login, RegisterUser } from "../controller/AuthController.ts";

export async function AuthRoute(app: FastifyInstance) {
  app.post("/register", RegisterUser);
  app.post("/login", Login);
}
