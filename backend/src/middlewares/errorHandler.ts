import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { createApiResponse } from "../utils/shared.ts";
import { ErrorDetailsType } from "../utils/types.ts";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // console.error("Erro interceptado:", error);

  let statusCode = error.statusCode ?? 500;

  let errorDetails: ErrorDetailsType = {
    code: error.name || "INTERNAL_ERROR",
    message: error.message, // error.message
    details: null, // error.stack,
  };

  if (error instanceof ZodError) {
    statusCode = 400;
    errorDetails = {
      code: "ZOD_VALIDATION_ERROR",
      message: "Erro de validação",
      details: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  return reply
    .status(statusCode)
    .send(
      createApiResponse(
        null,
        "Ocorreu um erro durante a requisição",
        errorDetails
      )
    );
}
