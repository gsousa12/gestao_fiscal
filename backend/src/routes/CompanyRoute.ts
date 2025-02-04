import { FastifyInstance } from "fastify";
import {
  CreateCompany,
  DeleteCompanyById,
  DisableCompany,
  GetCompanies,
  GetCompanyById,
} from "../controller/CompanyController.ts";

export async function CompanyRoute(app: FastifyInstance) {
  app.post("", CreateCompany);
  app.get("", GetCompanies);
  app.post("/id", GetCompanyById);
  app.post("/disable", DisableCompany);
  app.post("/delete", DeleteCompanyById);
}
