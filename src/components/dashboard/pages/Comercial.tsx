import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { comercialAeroports, comercialTotals, formatCurrency, chartColors } from "@/lib/dashboardData";

const Comercial = () => {
  const pressupostData = comercialAeroports.map((a, i) => ({
    name: a.codi,
    value: a.despeses.pressupostSACC + a.ingressos.pressupostSACC,
    color: chartColors[i % chartColors.length],
  }));

  const projeccioData = comercialAeroports.map((a, i) => ({
    name: a.codi,
    value: a.despeses.projeccio + a.ingressos.projeccio,
    color: chartColors[i % chartColors.length],
  }));

  const TableHeader = () => (
    <tr className="bg-primary text-primary-foreground">
      <th className="px-3 py-2.5 text-left font-semibold text-[11px]">Centre de Cost</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Acumulat</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Projecció Tancament</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Pressupost Inic.</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Disponibilitat</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Mes</th>
    </tr>
  );

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-2">
          <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
          <p className="text-xs font-mono text-foreground">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex gap-8">
      {/* Columna izquierda: Título y Tabla */}
      <div className="flex-1 flex flex-col min-w-0">
        <h2 className="text-4xl font-bold text-primary mb-6 leading-tight tracking-tight">
          PRESSUPOST X<br />CENTRE DE COST
        </h2>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-[11px]">
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              {comercialAeroports.map((aeroport, index) => {
                const acumulat = aeroport.despeses.acumulat + aeroport.ingressos.acumulat;
                const projeccio = aeroport.despeses.projeccio + aeroport.ingressos.projeccio;
                const pressupost = aeroport.despeses.pressupostSACC + aeroport.ingressos.pressupostSACC;
                const disponibilitat = aeroport.despeses.disponibilitat + aeroport.ingressos.disponibilitat;
                const mes = aeroport.despeses.mes + aeroport.ingressos.mes;
                
                return (
                  <tr key={aeroport.codi} className={index % 2 === 0 ? "bg-muted/40" : "bg-card"}>
                    <td className="px-3 py-2 font-medium text-foreground">{aeroport.nom} ({aeroport.codi})</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground tabular-nums">{formatCurrency(acumulat)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground tabular-nums">{formatCurrency(projeccio)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground tabular-nums">{formatCurrency(pressupost)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground tabular-nums">{formatCurrency(disponibilitat)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground tabular-nums">{formatCurrency(mes)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Columna derecha: Gráficos de barras */}
      <div className="w-[340px] flex flex-col gap-6 flex-shrink-0">
        {/* Gráfico Pressupost Inicial */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-base font-bold text-primary text-center mb-3 underline decoration-2 underline-offset-4">
            Pressupost Inicial
          </h4>
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pressupostData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}`} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                  {pressupostData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico Projecció Tancament */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-base font-bold text-primary text-center mb-3 underline decoration-2 underline-offset-4">
            Projecció Tancament
          </h4>
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projeccioData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}`} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                  {projeccioData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comercial;
