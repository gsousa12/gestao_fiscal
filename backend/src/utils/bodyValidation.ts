import { z } from "zod";

export const registerUserBody = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const createCompanyBody = z.object({
  companyName: z.string(),
  city: z.string(),
  adress: z.object({
    district: z.string(),
    street: z.string(),
    number: z.number(),
    complement: z.string(),
  }),
  companyType: z.string(),
  taxRegime: z.string(),
  isMEI: z.boolean(),
  responsibleEmployee: z.array(z.string()),
});

export const deleteCompanyBody = z.object({
  id: z.string(),
});
