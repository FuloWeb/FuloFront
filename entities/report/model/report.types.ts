export type ReportPeriod = {
  start: string;
  end: string;
};

export type ReportKey = "missing-products" | "sales-by-client" | "daily-revenue";

export type ReportDefinition = {
  key: ReportKey;
  title: string;
  description: string;
  filename: string;
  requiresPeriod: boolean;
};
