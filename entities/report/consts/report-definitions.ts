import { ReportDefinition } from "../model";

export const reportDefinitions: ReportDefinition[] = [
  {
    key: "missing-products",
    title: "Produtos faltantes",
    description: "Lista de produtos com estoque zerado.",
    filename: "produtos-faltantes.pdf",
    requiresPeriod: false,
  },
  {
    key: "sales-by-client",
    title: "Vendas por cliente",
    description: "Total de compras por cliente em um período.",
    filename: "compras-por-cliente.pdf",
    requiresPeriod: true,
  },
  {
    key: "daily-revenue",
    title: "Receita diária",
    description: "Receita consolidada por dia em um período.",
    filename: "receita-diaria.pdf",
    requiresPeriod: true,
  },
];
