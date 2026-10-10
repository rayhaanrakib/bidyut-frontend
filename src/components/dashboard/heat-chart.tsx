"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const HeatChart = ({ data }: { data: { name: string; minutes: number }[] }) => (
  <div className="rounded-3xl border border-line bg-card p-5">
    <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Avg resolution time — worst areas</h2>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,.2)" />
        <XAxis dataKey="name" fontSize={12} stroke="currentColor" opacity={0.6} />
        <YAxis fontSize={12} stroke="currentColor" opacity={0.6} unit="m" />
        <Tooltip cursor={{ fill: "rgba(128,128,128,.08)" }}
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
        <Bar dataKey="minutes" fill="var(--primary)" radius={[8, 8, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);