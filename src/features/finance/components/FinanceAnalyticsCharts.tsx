import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { FinanceChartPoint } from "../types";

interface FinanceAnalyticsChartsProps {
  statusData: FinanceChartPoint[];
  volumeData: FinanceChartPoint[];
}

const PIE_COLORS = ["hsl(var(--primary))", "#6366f1", "#22c55e", "#0ea5e9", "#ef4444"];

export function FinanceAnalyticsCharts({ statusData, volumeData }: FinanceAnalyticsChartsProps) {
  return (
    <div className="fin-charts">
      <article className="fin-chart-card">
        <h3 className="fin-chart-card__title">Approval pipeline</h3>
        <div className="fin-chart-card__body h-56">
          {statusData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={48} outerRadius={72}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="fin-chart-empty">No applications yet</p>
          )}
        </div>
      </article>

      <article className="fin-chart-card">
        <h3 className="fin-chart-card__title">Stage distribution</h3>
        <div className="fin-chart-card__body h-56">
          {statusData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="fin-chart-empty">No data</p>
          )}
        </div>
      </article>

      <article className="fin-chart-card fin-chart-card--wide">
        <h3 className="fin-chart-card__title">Disbursal volume trend</h3>
        <div className="fin-chart-card__body h-56">
          {volumeData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="fin-chart-empty">Volume chart builds as applications arrive</p>
          )}
        </div>
      </article>
    </div>
  );
}
