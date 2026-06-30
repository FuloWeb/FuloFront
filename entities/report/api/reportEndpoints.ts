import { endpointsMap } from "@/lib/api";
import { ReportKey } from "../model";

export const reportEndpoints: Record<ReportKey, (typeof endpointsMap)["reports"][keyof (typeof endpointsMap)["reports"]]> = {
  "missing-products": endpointsMap.reports.missingProducts,
  "sales-by-client": endpointsMap.reports.salesByClient,
  "daily-revenue": endpointsMap.reports.dailyRevenue,
};
