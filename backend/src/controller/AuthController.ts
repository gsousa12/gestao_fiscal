import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import UserModel from "../models/UserModel.ts";
import { LoginBody } from "../utils/interface.ts";
import jwt from "jsonwebtoken";
import { registerUserBody } from "../utils/bodyValidation.ts";

export async function RegisterUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const { username, email, password } = registerUserBody.parse(req.body);

    const salt = genSaltSync(5);

    const newUser = new UserModel({
      username,
      email,
      password: hashSync(password, salt),
    });

    await newUser.save();

    return res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(400).send({
      message: "Erro ao criar usuário",
      error: error,
    });
  }
}

export async function Login(
  req: FastifyRequest<{ Body: LoginBody }>,
  res: FastifyReply
) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const mathPassword = compareSync(req.body.password, user.password);

    if (!mathPassword) {
      return res.status(400).send({ message: "Senha ou Usuário incorretos." });
    }

    if (!process.env.JWT) {
      return res.status(500).send({ message: "Chave JWT não definida." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, {
      expiresIn: "4h",
    });

    const { password, role, ...otherDetails } = user.toObject();

    res
      .setCookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
        sameSite: "strict",
      })
      .status(200)
      .send({
        message: "Logado com sucesso",
        details: { ...otherDetails },
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno no servidor." });
  }
}
