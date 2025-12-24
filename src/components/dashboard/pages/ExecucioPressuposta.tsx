import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { TrendingUp, TrendingDown, Target, Wallet } from "lucide-react";
import { execucioPressuposta, formatCurrency, formatPercent, chartColors } from "@/lib/dashboardData";

const ExecucioPressuposta = () => {
  const { despeses, ingressos, inversions, romanent, kpis } = execucioPressuposta;

  const finançamentData = [
    { name: "Ingressos", value: ingressos.mensual, color: chartColors[1] },
    { name: "Transferències", value: 7489233, color: chartColors[0] },
    { name: "Romanent Cap.2", value: romanent.capitol2, color: chartColors[2] },
  ];

  const inversionsData = [
    { name: "Inversió efectuada", value: inversions.mensual, color: chartColors[0] },
    { name: "Romanent Cap.8", value: romanent.capitol8, color: chartColors[2] },
  ];

  const comparatiuData = [
    { name: "Despeses", mensual: despeses.mensual, estimacio: despeses.estimacioFinal, pressupost: despeses.pressupost },
    { name: "Ingressos", mensual: ingressos.mensual, estimacio: ingressos.estimacioFinal, pressupost: ingressos.pressupost },
    { name: "Inversions", mensual: inversions.mensual, estimacio: inversions.estimacioFinal, pressupost: inversions.pressupost },
  ];

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { title: "Sobrant Despesa", value: kpis.sobrantDespesa, icon: Wallet, variant: "positive" as const },
          { title: "Sobrant Total Pressupost", value: kpis.sobrantTotalPressupost, icon: TrendingUp, variant: "positive" as const },
          { title: "% Inversió Executada", value: null, percent: kpis.percentatgeInversio, icon: Target, variant: "default" as const },
          { title: "Romanent Aplicat", value: romanent.capitol2 + romanent.capitol8, icon: TrendingDown, variant: "default" as const },
        ].map((kpi, index) => (
          <div
            key={kpi.title}
            className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                  {kpi.title}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground font-mono">
                  {kpi.percent !== undefined ? formatPercent(kpi.percent) : formatCurrency(kpi.value!)}
                </p>
              </div>
              <div className={`rounded-full p-2 ${kpi.variant === 'positive' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                <kpi.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quadre simplificat */}
      <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="bg-primary px-4 py-2">
          <h3 className="text-xs font-semibold text-primary-foreground uppercase tracking-wide">
            Quadre Simplificat - Execució Pressupostària
          </h3>
        </div>
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-3 py-2 text-left font-semibold text-foreground">Concepte</th>
              <th className="px-2 py-2 text-right font-semibold text-foreground">Mensual</th>
              <th className="px-2 py-2 text-right font-semibold text-foreground">Estimació Final Any</th>
              <th className="px-2 py-2 text-right font-semibold text-foreground">SACC</th>
              <th className="px-2 py-2 text-right font-semibold text-foreground">Pressupost (Llei)</th>
              <th className="px-2 py-2 text-right font-semibold text-foreground">% Exec.</th>
            </tr>
          </thead>
          <tbody>
            {[
              { nom: "Despeses", ...despeses },
              { nom: "Ingressos", ...ingressos },
              { nom: "Inversions", ...inversions },
            ].map((row, idx) => {
              const execucio = (row.mensual / row.pressupost) * 100;
              return (
                <tr key={row.nom} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-3 py-2 font-medium text-foreground border-b border-border">{row.nom}</td>
                  <td className="px-2 py-2 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(row.mensual)}</td>
                  <td className="px-2 py-2 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(row.estimacioFinal)}</td>
                  <td className="px-2 py-2 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(row.sacc)}</td>
                  <td className="px-2 py-2 text-right font-mono text-foreground border-b border-border whitespace-nowrap">{formatCurrency(row.pressupost)}</td>
                  <td className="px-2 py-2 text-right font-mono text-primary font-semibold border-b border-border">{formatPercent(execucio)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Gràfics */}
      <div className="grid grid-cols-3 gap-3">
        {/* Finançament despesa */}
        <div className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-2">
            Finançament Despesa
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={finançamentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {finançamentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {finançamentData.map((item) => (
              <div key={item.name} className="flex items-center gap-1 text-[9px]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inversions + Romanent */}
        <div className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-2">
            Inversions + Romanent
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inversionsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 8 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={60} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {inversionsData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparatiu */}
        <div className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-2">
            Mensual vs Pressupost
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparatiuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 8 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="mensual" name="Mensual" fill={chartColors[0]} radius={[2, 2, 0, 0]} />
                <Bar dataKey="pressupost" name="Pressupost" fill={chartColors[2]} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Romanent detallat */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-muted/30 p-3 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-2">Romanent Aplicat</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] text-muted-foreground">Capítol 2 (Béns i Serveis):</span>
              <span className="text-xs font-mono font-medium text-foreground">{formatCurrency(romanent.capitol2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-muted-foreground">Capítol 8 (Inversions):</span>
              <span className="text-xs font-mono font-medium text-foreground">{formatCurrency(romanent.capitol8)}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <span className="text-[10px] font-medium text-foreground">Total Romanent:</span>
                <span className="text-xs font-mono font-semibold text-primary">{formatCurrency(romanent.capitol2 + romanent.capitol8)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-3 opacity-0 animate-fade-in" style={{ animationDelay: "700ms" }}>
          <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-2">Balanç</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] text-muted-foreground">Ingressos - Despeses:</span>
              <span className="text-xs font-mono font-medium text-destructive">{formatCurrency(ingressos.mensual - despeses.mensual)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-muted-foreground">+ Romanent aplicat:</span>
              <span className="text-xs font-mono font-medium text-foreground">{formatCurrency(romanent.capitol2)}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <span className="text-[10px] font-medium text-foreground">Finançament Despesa:</span>
                <span className="text-xs font-mono font-semibold text-success">{formatCurrency(kpis.sobrantDespesa)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecucioPressuposta;
