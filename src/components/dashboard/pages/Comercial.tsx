import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { comercialAeroports, comercialTotals, formatCurrency, chartColors } from "@/lib/dashboardData";

const Comercial = () => {
  // Datos para gráficos de pastel - PRESSUPOST
  const pressupostDespesesData = comercialAeroports
    .filter(a => a.despeses.pressupostSACC > 0)
    .map((a, i) => ({ name: a.codi, value: a.despeses.pressupostSACC, color: chartColors[i % chartColors.length] }));

  const pressupostIngressosData = comercialAeroports
    .filter(a => a.ingressos.pressupostSACC > 0)
    .map((a, i) => ({ name: a.codi, value: a.ingressos.pressupostSACC, color: chartColors[i % chartColors.length] }));

  // Datos para gráficos de pastel - PREVISIÓ
  const previsioData = comercialAeroports.map((a, i) => ({
    name: a.codi,
    despeses: a.despeses.projeccio,
    ingressos: a.ingressos.projeccio,
    color: chartColors[i % chartColors.length],
  }));

  const previsioDespesesData = comercialAeroports
    .filter(a => a.despeses.projeccio > 0)
    .map((a, i) => ({ name: a.codi, value: a.despeses.projeccio, color: chartColors[i % chartColors.length] }));

  const previsioIngressosData = comercialAeroports
    .filter(a => a.ingressos.projeccio > 0)
    .map((a, i) => ({ name: a.codi, value: a.ingressos.projeccio, color: chartColors[i % chartColors.length] }));

  const TableHeader = () => (
    <tr className="bg-secondary/50">
      <th className="px-2 py-1.5 text-left font-semibold text-foreground border-b border-border">Aeroport</th>
      <th className="px-2 py-1.5 text-right font-semibold text-foreground border-b border-l border-border">MES</th>
      <th className="px-2 py-1.5 text-right font-semibold text-foreground border-b border-l border-border">Acumulat</th>
      <th className="px-2 py-1.5 text-right font-semibold text-foreground border-b border-l border-border">Projecció</th>
      <th className="px-2 py-1.5 text-right font-semibold text-foreground border-b border-l border-border">Press. SACC</th>
      <th className="px-2 py-1.5 text-right font-semibold text-foreground border-b border-l border-border">Disponib.</th>
    </tr>
  );

  return (
    <div className="space-y-4">
      {/* Dos tablas lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        {/* Tabla DESPESES */}
        <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in">
          <div className="bg-destructive/80 px-3 py-2">
            <h3 className="text-xs font-semibold text-destructive-foreground uppercase tracking-wide">
              Despeses per Aeroport
            </h3>
          </div>
          <table className="w-full text-[9px]">
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              {comercialAeroports.map((aeroport, index) => (
                <tr key={aeroport.codi} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-2 py-1 font-medium text-foreground border-b border-border">{aeroport.codi}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.despeses.mes)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.despeses.acumulat)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.despeses.projeccio)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.despeses.pressupostSACC)}</td>
                  <td className="px-2 py-1 text-right font-mono text-success border-b border-l border-border">{formatCurrency(aeroport.despeses.disponibilitat)}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-bold">
                <td className="px-2 py-1.5 font-bold text-foreground border-t-2 border-primary">TOTAL</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.despeses.mes)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.despeses.acumulat)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.despeses.projeccio)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.despeses.pressupostSACC)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-success border-t-2 border-l border-primary">{formatCurrency(comercialTotals.despeses.disponibilitat)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabla INGRESSOS */}
        <div className="rounded-lg border border-border bg-card overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="bg-success/80 px-3 py-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wide">
              Ingressos per Aeroport
            </h3>
          </div>
          <table className="w-full text-[9px]">
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              {comercialAeroports.map((aeroport, index) => (
                <tr key={aeroport.codi} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-2 py-1 font-medium text-foreground border-b border-border">{aeroport.codi}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.ingressos.mes)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.ingressos.acumulat)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.ingressos.projeccio)}</td>
                  <td className="px-2 py-1 text-right font-mono text-foreground border-b border-l border-border">{formatCurrency(aeroport.ingressos.pressupostSACC)}</td>
                  <td className="px-2 py-1 text-right font-mono text-success border-b border-l border-border">{formatCurrency(aeroport.ingressos.disponibilitat)}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-bold">
                <td className="px-2 py-1.5 font-bold text-foreground border-t-2 border-primary">TOTAL</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.ingressos.mes)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.ingressos.acumulat)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.ingressos.projeccio)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-foreground border-t-2 border-l border-primary">{formatCurrency(comercialTotals.ingressos.pressupostSACC)}</td>
                <td className="px-2 py-1.5 text-right font-mono text-success border-t-2 border-l border-primary">{formatCurrency(comercialTotals.ingressos.disponibilitat)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos de pastel */}
      <div className="grid grid-cols-2 gap-3">
        {/* PRESSUPOST */}
        <div className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2 text-center">
            Pressupost SACC
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-center text-muted-foreground mb-1">Despeses</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pressupostDespesesData} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={40} 
                      paddingAngle={2} 
                      dataKey="value"
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {pressupostDespesesData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className="text-[9px] text-center text-muted-foreground mb-1">Ingressos</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pressupostIngressosData} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={40} 
                      paddingAngle={2} 
                      dataKey="value"
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {pressupostIngressosData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* PREVISIÓ */}
        <div className="rounded-lg border border-border bg-card p-3 opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2 text-center">
            Previsió (Projecció)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-center text-muted-foreground mb-1">Despeses</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={previsioDespesesData} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={40} 
                      paddingAngle={2} 
                      dataKey="value"
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {previsioDespesesData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className="text-[9px] text-center text-muted-foreground mb-1">Ingressos</p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={previsioIngressosData} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={40} 
                      paddingAngle={2} 
                      dataKey="value"
                      label={({ name }) => name}
                      labelLine={false}
                    >
                      {previsioIngressosData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        {comercialAeroports.map((a, i) => (
          <div key={a.codi} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: chartColors[i % chartColors.length] }} />
            <span className="text-[9px] text-muted-foreground">{a.codi} - {a.nom}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comercial;
