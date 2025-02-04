import { FastifyRequest, FastifyReply } from "fastify";
import { createCompanyBody } from "../utils/bodyValidation.ts";
import CompanyModel from "../models/CompanyModel.ts";

import { createApiResponse } from "../utils/shared.ts";

export async function CreateCompany(req: FastifyRequest, res: FastifyReply) {
  try {
    const {
      companyCode,
      companyName,
      city,
      adress,
      companyType,
      responsibleEmployee,
      taxRegime,
    } = createCompanyBody.parse(req.body);

    const newCompany = new CompanyModel({
      companyCode,
      companyName,
      city,
      adress,
      companyType,
      responsibleEmployee,
      taxRegime,
    });

    await newCompany.save();

    return res.status(201).send({ message: "Empresa criada com sucesso" });
  } catch (error) {
    throw error;
  }
}

export async function GetCompanies(req: FastifyRequest, res: FastifyReply) {
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
  req: FastifyRequest<{ Body: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.body;

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
  req: FastifyRequest<{ Body: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.body;

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
  req: FastifyRequest<{ Body: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.body;

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
