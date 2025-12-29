import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { comercialAeroports, comercialTotals, formatCurrency, chartColors } from "@/lib/dashboardData";

const Comercial = () => {
  // Datos para gráficos - Pressupost Inicial
  const pressupostData = comercialAeroports.map((a, i) => ({
    name: `${a.nom} (${a.codi})`,
    value: a.despeses.pressupostSACC + a.ingressos.pressupostSACC,
    color: chartColors[i % chartColors.length],
  }));

  // Datos para gráficos - Projecció Tancament
  const projeccioData = comercialAeroports.map((a, i) => ({
    name: `${a.nom} (${a.codi})`,
    value: a.despeses.projeccio + a.ingressos.projeccio,
    color: chartColors[i % chartColors.length],
  }));

  // Calcular porcentajes para labels
  const totalPressupost = pressupostData.reduce((sum, d) => sum + d.value, 0);
  const totalProjectio = projeccioData.reduce((sum, d) => sum + d.value, 0);

  const TableHeader = () => (
    <tr className="bg-primary text-primary-foreground">
      <th className="px-3 py-2 text-left font-semibold text-[11px]">Aeroport</th>
      <th className="px-3 py-2 text-right font-semibold text-[11px]">Acumulat</th>
      <th className="px-3 py-2 text-right font-semibold text-[11px]">Projecció Tancament</th>
      <th className="px-3 py-2 text-right font-semibold text-[11px]">Pressupost Inicial</th>
      <th className="px-3 py-2 text-right font-semibold text-[11px]">Disponibilitat</th>
      <th className="px-3 py-2 text-right font-semibold text-[11px]">Mes</th>
    </tr>
  );

  // Componente de leyenda personalizado
  const CustomLegend = ({ data }: { data: typeof pressupostData }) => (
    <div className="flex flex-col gap-1 text-[10px]">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm flex-shrink-0" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-foreground truncate">{entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex gap-6">
      {/* Columna izquierda: Título y Tabla */}
      <div className="flex-1 flex flex-col">
        {/* Título grande */}
        <h2 className="text-3xl font-bold text-primary mb-6 leading-tight">
          PRESSUPOST X<br />CENTRE DE COST
        </h2>

        {/* Tabla única combinada */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
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
                  <tr key={aeroport.codi} className={index % 2 === 0 ? "bg-muted/30" : "bg-card"}>
                    <td className="px-3 py-2 font-medium text-foreground">{aeroport.nom} ({aeroport.codi})</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{formatCurrency(acumulat)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{formatCurrency(projeccio)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{formatCurrency(pressupost)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{formatCurrency(disponibilitat)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{formatCurrency(mes)}</td>
                  </tr>
                );
              })}
              <tr className="bg-primary/10 font-bold border-t-2 border-primary">
                <td className="px-3 py-2 font-bold text-foreground">TOTAL</td>
                <td className="px-3 py-2 text-right font-mono text-foreground">
                  {formatCurrency(comercialTotals.despeses.acumulat + comercialTotals.ingressos.acumulat)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-foreground">
                  {formatCurrency(comercialTotals.despeses.projeccio + comercialTotals.ingressos.projeccio)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-foreground">
                  {formatCurrency(comercialTotals.despeses.pressupostSACC + comercialTotals.ingressos.pressupostSACC)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-foreground">
                  {formatCurrency(comercialTotals.despeses.disponibilitat + comercialTotals.ingressos.disponibilitat)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-foreground">
                  {formatCurrency(comercialTotals.despeses.mes + comercialTotals.ingressos.mes)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Columna derecha: Gráficos con leyendas */}
      <div className="w-[340px] flex flex-col gap-4">
        {/* Gráfico Pressupost Inicial */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-sm font-bold text-primary text-center mb-2 underline">
            Pressupost Inicial
          </h4>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-[160px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pressupostData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      if (percent < 0.05) return null;
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 15;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="hsl(var(--foreground))"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={9}
                        >
                          {`${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {pressupostData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend data={pressupostData} />
          </div>
        </div>

        {/* Gráfico Projecció Tancament */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-sm font-bold text-primary text-center mb-2 underline">
            Projecció Tancament
          </h4>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-[160px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projeccioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      if (percent < 0.05) return null;
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 15;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="hsl(var(--foreground))"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={9}
                        >
                          {`${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {projeccioData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend data={projeccioData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comercial;
