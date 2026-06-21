import React from "react";
import { Pencil, Trash2 } from "lucide-react";

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];

  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;

  className?: string;
};

export function Table<T>({
  data,
  columns,
  onEdit,
  onDelete,
  className,
}: TableProps<T>) {
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div className={`border rounded-lg bg-white ${className ?? ""}`}>
      <table className="w-full text-sm">

        <thead className="text-left text-muted-foreground border-b">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="py-3 px-4 font-medium">
                {col.header}
              </th>
            ))}

            {hasActions && (
              <th className="py-3 px-4 text-right">
                Ações
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b last:border-none hover:bg-muted/40 transition"
            >
              {columns.map((col, j) => (
                <td key={j} className="py-3 px-4">
                  {col.accessor(row)}
                </td>
              ))}

              {hasActions && (
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-3">

                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil size={16} />
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}