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

  // Calcular porcentajes
  const totalPressupost = pressupostData.reduce((sum, d) => sum + d.value, 0);
  const totalProjectio = projeccioData.reduce((sum, d) => sum + d.value, 0);

  const TableHeader = () => (
    <tr className="bg-primary text-primary-foreground">
      <th className="px-3 py-2.5 text-left font-semibold text-[11px]">Centre de Cost</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Acumulat</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Projecció Tancament</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Pressupost Inic...</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Disponibilitat</th>
      <th className="px-3 py-2.5 text-right font-semibold text-[11px]">Mes</th>
    </tr>
  );

  // Componente de leyenda personalizado con porcentajes alineados
  const CustomLegend = ({ data, total }: { data: typeof pressupostData; total: number }) => (
    <div className="flex flex-col gap-1.5">
      {data.map((entry, index) => {
        const percent = ((entry.value / total) * 100).toFixed(1);
        return (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-[10px] text-foreground leading-tight">{entry.name}</span>
          </div>
        );
      })}
    </div>
  );

  // Renderizar label con porcentaje dentro del gráfico
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.03) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="h-full flex gap-8">
      {/* Columna izquierda: Título y Tabla */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Título grande */}
        <h2 className="text-4xl font-bold text-primary mb-6 leading-tight tracking-tight">
          PRESSUPOST X<br />CENTRE DE COST
        </h2>

        {/* Tabla única combinada */}
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

      {/* Columna derecha: Gráficos con leyendas */}
      <div className="w-[320px] flex flex-col gap-6 flex-shrink-0">
        {/* Gráfico Pressupost Inicial */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-base font-bold text-primary text-center mb-3 underline decoration-2 underline-offset-4">
            Pressupost Inicial
          </h4>
          <div className="flex items-center gap-4 flex-1">
            <div className="w-[150px] h-[150px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pressupostData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={0}
                    dataKey="value"
                    label={renderCustomLabel}
                    labelLine={false}
                    strokeWidth={1}
                    stroke="white"
                  >
                    {pressupostData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{ 
                      fontSize: "11px", 
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend data={pressupostData} total={totalPressupost} />
          </div>
        </div>

        {/* Gráfico Projecció Tancament */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-base font-bold text-primary text-center mb-3 underline decoration-2 underline-offset-4">
            Projecció Tancament
          </h4>
          <div className="flex items-center gap-4 flex-1">
            <div className="w-[150px] h-[150px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projeccioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={0}
                    dataKey="value"
                    label={renderCustomLabel}
                    labelLine={false}
                    strokeWidth={1}
                    stroke="white"
                  >
                    {projeccioData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{ 
                      fontSize: "11px", 
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend data={projeccioData} total={totalProjectio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comercial;
