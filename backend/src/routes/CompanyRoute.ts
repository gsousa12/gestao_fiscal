import { FastifyInstance } from "fastify";
import {
  CreateCompany,
  DeleteCompanyById,
  DisableCompany,
  GetAllCompanies,
  GetCompanyById,
} from "../controller/CompanyController.ts";

export async function CompanyRoute(app: FastifyInstance) {
  app.post("/create", CreateCompany);
  app.get("/all", GetAllCompanies);
  app.get("/get/:id", GetCompanyById);
  app.post("/disable/:id", DisableCompany);
  app.post("/delete/:id", DeleteCompanyById);
}
