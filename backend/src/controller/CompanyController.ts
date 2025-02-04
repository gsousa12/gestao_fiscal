import { FastifyRequest, FastifyReply } from "fastify";
import {
  createCompanyBody,
  deleteCompanyBody,
} from "../utils/bodyValidation.ts";
import CompanyModel from "../models/CompanyModel.ts";
import { request } from "http";
import { createApiResponse } from "../utils/shared.ts";

import { ZodError } from "zod";

// ...

export async function CreateCompany(req: FastifyRequest, res: FastifyReply) {
  try {
    // Se usar parse (que lança exceção em caso de falha):
    const {
      companyName,
      city,
      adress,
      companyType,
      isMEI,
      responsibleEmployee,
      taxRegime,
    } = createCompanyBody.parse(req.body);

    const newCompany = new CompanyModel({
      companyName,
      city,
      adress,
      companyType,
      isMEI,
      responsibleEmployee,
      taxRegime,
    });

    await newCompany.save();

    // Sucesso
    return res.status(201).send({ message: "Empresa criada com sucesso" });
  } catch (error) {
    // Aqui, logamos se quisermos
    console.error("Erro ao criar empresa:", error);

    // Re-lançamos o erro para que o errorHandler capture
    throw error;
  }
}

export async function GetAllCompanies(req: FastifyRequest, res: FastifyReply) {
  try {
    const companies = await CompanyModel.find({ deletionDate: null });

    if (companies.length === 0) {
      const notFoundError: any = new Error("Nenhuma empresa encontrada.");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return res
      .status(200)
      .send(createApiResponse(companies, "Empresas encontradas", null));
  } catch (error) {
    console.error("Erro em GetAllCompanies:", error);
    throw error;
  }
}

export async function GetCompanyById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const company = await CompanyModel.findOne({ _id: id, deletionDate: null });

    if (!company) {
      const notFoundError: any = new Error("Nenhuma empresa encontrada.");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return reply
      .status(200)
      .send(
        createApiResponse({ company }, "Empresa encontrada com sucesso", null)
      );
  } catch (error) {
    console.error("Erro em GetCompanyById:", error);
    throw error;
  }
}

export async function DisableCompany(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.params;

    const company = await CompanyModel.findOne({
      _id: id,
    });
    if (!company) {
      return res.status(404).send({ message: "Empresa não encontrada." });
    }

    if (company.deletionDate) {
      return res
        .status(400)
        .send({ message: "Empresa já foi desativada anteriormente." });
    }

    company.deletionDate = new Date();
    await company.save();

    return res.status(200).send({ message: "Empresa desativada com sucesso." });
  } catch (error) {
    return res.status(400).send({
      message: "Erro ao desativar a empresa.",
      error: error,
    });
  }
}

export async function DeleteCompanyById(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.params;

    const company = await CompanyModel.findOneAndDelete({
      _id: id,
    });

    if (!company) {
      return res.status(404).send({ message: "Empresa não encontrada." });
    }

    if (company.deletionDate === null) {
      return res.status(400).send({
        message:
          "Erro ao tentar deletar a empresa. Empresa precisa ser primeiramente desativa para depois ser deletada",
      });
    }

    return res.status(200).send({ message: "Empresa deletada com sucesso." });
  } catch (error) {
    return res.status(400).send({
      message: "Erro ao desativar a empresa.",
      error: error,
    });
  }
}
