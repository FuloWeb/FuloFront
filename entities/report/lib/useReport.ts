"use client";

import { useState, useCallback } from "react";
import { buildQuery, httpClient, resolveEndpoint } from "@/lib/api";
import { ReportKey, ReportPeriod } from "../model";
import { reportEndpoints } from "../api";
import { reportDefinitions } from "../consts";

export function useReport() {
  const [loadingKey, setLoadingKey] = useState<ReportKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = useCallback(
    async (key: ReportKey, period?: ReportPeriod) => {
      const endpoint = reportEndpoints[key];
      const definition = reportDefinitions.find((report) => report.key === key);

      setLoadingKey(key);
      setError(null);

      try {
        const url = `${resolveEndpoint(endpoint.path)}${buildQuery(period)}`;

        const response = await httpClient.request<Blob>({
          url,
          method: endpoint.method,
          responseType: "blob",
        });

        if (!response?.data) {
          throw new Error("Não foi possível gerar o relatório.");
        }

        const blobUrl = URL.createObjectURL(response.data);
        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = definition?.filename ?? `${key}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);
      } catch {
        setError("Erro ao gerar o relatório. Tente novamente.");
      } finally {
        setLoadingKey(null);
      }
    },
    []
  );

  return {
    downloadReport,
    loadingKey,
    error,
  };
}
