"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from "@/shared/ui";
import { ReportDefinition, reportPeriodSchema, ReportPeriodFormData } from "../model";
import { useReport } from "../lib";

type Props = {
  report: ReportDefinition;
};

export function ReportCard({ report }: Props) {
  const { downloadReport, loadingKey } = useReport();
  const isLoading = loadingKey === report.key;

  const form = useForm<ReportPeriodFormData>({
    resolver: zodResolver(reportPeriodSchema),
    defaultValues: { start: "", end: "" },
  });

  const handleDownloadWithoutPeriod = () => {
    downloadReport(report.key);
  };

  const handleDownloadWithPeriod = form.handleSubmit((data) => {
    downloadReport(report.key, data);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{report.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{report.description}</p>

        {report.requiresPeriod ? (
          <form onSubmit={handleDownloadWithPeriod} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>De</FieldLabel>
                <FieldContent>
                  <Input type="date" {...form.register("start")} />
                </FieldContent>
                <FieldError errors={[form.formState.errors.start]} />
              </Field>

              <Field>
                <FieldLabel>Até</FieldLabel>
                <FieldContent>
                  <Input type="date" {...form.register("end")} />
                </FieldContent>
                <FieldError errors={[form.formState.errors.end]} />
              </Field>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              <Download size={16} className="mr-2" />
              {isLoading ? "Gerando..." : "Gerar PDF"}
            </Button>
          </form>
        ) : (
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDownloadWithoutPeriod}
            className="w-full"
          >
            <Download size={16} className="mr-2" />
            {isLoading ? "Gerando..." : "Gerar PDF"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
