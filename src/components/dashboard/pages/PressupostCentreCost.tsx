import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import { centresCost, formatCurrency, chartColors } from "@/lib/dashboardData";

const PressupostCentreCost = () => {
  const totals = {
    ingressos: {
      acumulat: centresCost.reduce((sum, c) => sum + c.ingressos.acumulat, 0),
      previst: centresCost.reduce((sum, c) => sum + c.ingressos.previst, 0),
    },
    despeses: {
      acumulat: centresCost.reduce((sum, c) => sum + c.despeses.acumulat, 0),
      previst: centresCost.reduce((sum, c) => sum + c.despeses.previst, 0),
    },
    inversions: {
      acumulat: centresCost.reduce((sum, c) => sum + c.inversions.acumulat, 0),
      previst: centresCost.reduce((sum, c) => sum + c.inversions.previst, 0),
    },
  };

  const saldo = totals.ingressos.acumulat - totals.despeses.acumulat;

  const ingressosData = centresCost
    .filter(c => c.ingressos.acumulat > 0)
    .map((c, i) => ({ name: c.nom, value: c.ingressos.acumulat, color: chartColors[i % chartColors.length] }));

  const despesesData = centresCost
    .filter(c => c.despeses.acumulat > 0)
    .map((c, i) => ({ name: c.nom, value: c.despeses.acumulat, color: chartColors[i % chartColors.length] }));

  const inversionsData = centresCost
    .filter(c => c.inversions.acumulat > 0)
    .map((c, i) => ({ name: c.nom, value: c.inversions.acumulat, color: chartColors[i % chartColors.length] }));

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { title: "Total Ingressos (Acumulat)", value: totals.ingressos.acumulat, icon: TrendingUp, variant: "positive" as const },
          { title: "Total Despeses (Acumulat)", value: totals.despeses.acumulat, icon: TrendingDown, variant: "negative" as const },
          { title: "Saldo (Ing. - Desp.)", value: saldo, icon: Scale, variant: saldo >= 0 ? "positive" as const : "negative" as const },
        ].map((kpi, index) => (
          <div
            key={kpi.title}
            className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">{kpi.title}</p>
                <p className="mt-1 text-lg font-semibold text-foreground font-mono">{formatCurrency(kpi.value)}</p>
              </div>
              <div className={`rounded-full p-2 ${kpi.variant === 'positive' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                <kpi.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table + Charts */}
      <div className="grid grid-cols-[1fr,180px] gap-3">
        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="bg-primary px-3 py-2">
            <h3 className="text-xs font-semibold text-primary-foreground uppercase tracking-wide">
              Pressupost per Centre de Cost
            </h3>
          </div>
          <table className="w-full text-[9px]">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-2 py-1.5 text-left font-semibold text-foreground border-b border-border" rowSpan={2}>Centre</th>
                <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border" colSpan={2}>Ingressos</th>
                <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border" colSpan={2}>Despeses</th>
                <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border" colSpan={2}>Inversions</th>
              </tr>
              <tr className="bg-muted/30">
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border">Acum.</th>
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border">Prev.</th>
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border">Acum.</th>
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border">Prev.</th>
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border">Acum.</th>
                <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border">Prev.</th>
              </tr>
            </thead>
            <tbody>
              {centresCost.map((centre, index) => (
                <tr key={centre.codi} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-2 py-1 font-medium text-foreground border-b border-border whitespace-nowrap">{centre.nom}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-l border-border whitespace-nowrap">{formatCurrency(centre.ingressos.acumulat)}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(centre.ingressos.previst)}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-l border-border whitespace-nowrap">{formatCurrency(centre.despeses.acumulat)}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(centre.despeses.previst)}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-l border-border whitespace-nowrap">{formatCurrency(centre.inversions.acumulat)}</td>
                  <td className="px-1 py-1 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(centre.inversions.previst)}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-bold">
                <td className="px-2 py-1.5 font-bold text-foreground border-t-2 border-primary">TOTAL</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary whitespace-nowrap">{formatCurrency(totals.ingressos.acumulat)}</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-primary whitespace-nowrap">{formatCurrency(totals.ingressos.previst)}</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary whitespace-nowrap">{formatCurrency(totals.despeses.acumulat)}</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-primary whitespace-nowrap">{formatCurrency(totals.despeses.previst)}</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary whitespace-nowrap">{formatCurrency(totals.inversions.acumulat)}</td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-t-2 border-primary whitespace-nowrap">{formatCurrency(totals.inversions.previst)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Donuts */}
        <div className="space-y-2">
          {[
            { title: "Ingressos", data: ingressosData },
            { title: "Despeses", data: despesesData },
            { title: "Inversions", data: inversionsData },
          ].map((chart, idx) => (
            <div key={chart.title} className="rounded-lg border border-border bg-card p-2 opacity-0 animate-fade-in" style={{ animationDelay: `${200 + idx * 100}ms` }}>
              <h4 className="text-[9px] font-semibold text-foreground uppercase tracking-wide mb-1">{chart.title} per Actiu</h4>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chart.data} cx="50%" cy="50%" innerRadius={15} outerRadius={30} paddingAngle={2} dataKey="value">
                      {chart.data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressupostCentreCost;
