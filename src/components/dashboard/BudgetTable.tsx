import { centresCostData, totals, formatCurrency } from "@/lib/budgetData";

const BudgetTable = () => {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="bg-primary px-4 py-3">
        <h2 className="text-sm font-semibold text-primary-foreground uppercase tracking-wide">
          Pressupost per Centre de Cost
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-secondary/50">
              <th className="px-2 py-1.5 text-left font-semibold text-foreground border-b border-border text-[10px]" rowSpan={2}>
                Centre de Cost
              </th>
              <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border text-[10px]" colSpan={2}>
                Ingressos
              </th>
              <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border text-[10px]" colSpan={2}>
                Despeses
              </th>
              <th className="px-1 py-1 text-center font-semibold text-foreground border-b border-l border-border text-[10px]" colSpan={2}>
                Inversions
              </th>
            </tr>
            <tr className="bg-muted/30">
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border text-[9px]">
                Acum.
              </th>
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border text-[9px]">
                Prev.
              </th>
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border text-[9px]">
                Acum.
              </th>
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border text-[9px]">
                Prev.
              </th>
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-l border-border text-[9px]">
                Acum.
              </th>
              <th className="px-1 py-1 text-center font-medium text-muted-foreground border-b border-border text-[9px]">
                Prev.
              </th>
            </tr>
          </thead>
          <tbody>
            {centresCostData.map((centre, index) => (
              <tr
                key={centre.nom}
                className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}
              >
                <td className="px-2 py-1.5 font-medium text-foreground border-b border-border whitespace-nowrap text-[10px]">
                  {centre.nom}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-l border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.ingressos.acumulat)}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.ingressos.previst)}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-l border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.despeses.acumulat)}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.despeses.previst)}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-l border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.inversions.acumulat)}
                </td>
                <td className="px-1 py-1.5 text-right font-mono text-foreground border-b border-border text-[10px] whitespace-nowrap">
                  {formatCurrency(centre.inversions.previst)}
                </td>
              </tr>
            ))}
            {/* Total row */}
            <tr className="bg-primary/5 font-bold">
              <td className="px-2 py-2 font-bold text-foreground border-t-2 border-primary text-[10px]">
                TOTAL
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-l border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.ingressos.acumulat)}
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.ingressos.previst)}
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-l border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.despeses.acumulat)}
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.despeses.previst)}
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-l border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.inversions.acumulat)}
              </td>
              <td className="px-1 py-2 text-right font-mono text-foreground border-t-2 border-primary text-[10px] whitespace-nowrap">
                {formatCurrency(totals.inversions.previst)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;
