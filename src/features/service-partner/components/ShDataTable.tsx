import type { ReactNode } from "react";

type Column<T> = { key: string; header: string; cell: (row: T) => ReactNode };

export function ShDataTable<T>({
  columns,
  rows,
  rowKey,
  empty = "No records",
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  empty?: string;
}) {
  if (!rows.length) return <p className="py-8 text-center text-sm text-muted-foreground">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="sh-table w-full text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key}>{c.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
