import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { evolucioHistorica, formatCurrency } from "@/lib/dashboardData";

const EvolucioHistorica = () => {
  const chartData = evolucioHistorica.anys.map((any, index) => ({
    any,
    personal: evolucioHistorica.personal[index],
    capitol2: evolucioHistorica.capitol2[index],
    inversions: evolucioHistorica.inversions[index],
    ingressosMercat: evolucioHistorica.ingressosMercat[index],
    transferencies: evolucioHistorica.transferencies[index],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-foreground mb-2">Any {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-mono text-foreground">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">
        Evolució dels principals indicadors econòmics dels últims 5 anys (2021-2025)
      </p>

      {/* Main chart: Despeses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            Despeses (Capítol 2 + Personal)
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="any" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="capitol2" name="Capítol 2" stroke="hsl(215, 80%, 35%)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="personal" name="Personal" stroke="hsl(168, 65%, 40%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            Inversions (Capítol 6)
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="any" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="inversions" name="Inversions" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ingressos chart */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            Ingressos de Mercat
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="any" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="ingressosMercat" name="Ingressos Mercat" stroke="hsl(280, 65%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            Transferències Gencat
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="any" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="transferencies" name="Transferències" stroke="hsl(330, 70%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-3 py-2 text-left font-semibold">Concepte</th>
              {evolucioHistorica.anys.map((any) => (
                <th key={any} className="px-2 py-2 text-right font-semibold">{any}</th>
              ))}
              <th className="px-2 py-2 text-right font-semibold">Var. 24/25</th>
            </tr>
          </thead>
          <tbody>
            {[
              { nom: "Personal (Cap. 1)", data: evolucioHistorica.personal },
              { nom: "Béns i Serveis (Cap. 2)", data: evolucioHistorica.capitol2 },
              { nom: "Inversions (Cap. 6)", data: evolucioHistorica.inversions },
              { nom: "Ingressos Mercat", data: evolucioHistorica.ingressosMercat },
              { nom: "Transferències Gencat", data: evolucioHistorica.transferencies },
            ].map((row, idx) => {
              const var2425 = ((row.data[4] - row.data[3]) / row.data[3]) * 100;
              return (
                <tr key={row.nom} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-3 py-1.5 font-medium text-foreground border-b border-border">{row.nom}</td>
                  {row.data.map((val, i) => (
                    <td key={i} className="px-2 py-1.5 text-right font-mono text-foreground border-b border-border whitespace-nowrap">
                      {formatCurrency(val)}
                    </td>
                  ))}
                  <td className={`px-2 py-1.5 text-right font-mono border-b border-border whitespace-nowrap ${var2425 >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {var2425 >= 0 ? '+' : ''}{var2425.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvolucioHistorica;
