export interface LoginBody {
  username: string;
  email: string;
  password: string;
}

export interface CompanyBody {
  _id: string;
  companyName: string;
  city: string;
  adress: {
    district: string;
    street: string;
    number: number;
    complement: string;
  };
  companyType: string;
  taxRegime: string;
  isMEI: boolean;
  responsibleEmployee: string[];
}
