"use client";

import { reportDefinitions } from "@/entities";
import { ReportCard } from "@/entities/report/ui";

export default function AdminReports() {
  return (
    <section className="flex flex-col gap-4">
      <h2>Relatórios:</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {reportDefinitions.map((report) => (
          <ReportCard key={report.key} report={report} />
        ))}
      </div>
    </section>
  );
}
