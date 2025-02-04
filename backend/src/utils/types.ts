export type ValidationIssue = {
  path: string;
  message: string;
};

export type ErrorDetailsType = {
  code: string;
  message: string | null;
  details?: string | ValidationIssue[] | null;
};
