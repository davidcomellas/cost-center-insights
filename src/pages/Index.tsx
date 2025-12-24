import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import BudgetTable from "@/components/dashboard/BudgetTable";
import InvestmentDonut from "@/components/dashboard/InvestmentDonut";
import { totals, formatCurrency } from "@/lib/budgetData";

const Index = () => {
  // Calcular saldo (Ingressos - Despeses) per al mes (usem acumulat com a aproximació)
  const saldoMes = totals.ingressos.acumulat - totals.despeses.acumulat;
  const isSaldoPositive = saldoMes >= 0;

  return (
    <div className="min-h-screen bg-background">
      {/* A4 Page Container - 210mm x 297mm ratio */}
      <div className="mx-auto max-w-[210mm] min-h-[297mm] bg-card shadow-xl print:shadow-none">
        {/* Header */}
        <header className="bg-primary px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-primary-foreground/70 uppercase tracking-widest">
                Preview
              </p>
              <h1 className="text-lg font-bold text-primary-foreground">
                Pressupost x Centre de Cost (APC)
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-primary-foreground/70 uppercase">
                Període
              </p>
              <p className="text-sm font-semibold text-primary-foreground">
                Novembre 2025
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-4">
            <KPICard
              title="Total Ingressos (Acumulat)"
              value={formatCurrency(totals.ingressos.acumulat)}
              icon={<TrendingUp className="h-5 w-5" />}
              variant="positive"
              delay={0}
            />
            <KPICard
              title="Total Despeses (Acumulat)"
              value={formatCurrency(totals.despeses.acumulat)}
              icon={<TrendingDown className="h-5 w-5" />}
              variant="negative"
              delay={100}
            />
            <KPICard
              title="Saldo (Ing. - Desp.)"
              value={formatCurrency(saldoMes)}
              icon={<Scale className="h-5 w-5" />}
              variant={isSaldoPositive ? "positive" : "negative"}
              delay={150}
            />
          </div>

          {/* Main content: Table + Donut */}
          <div className="grid grid-cols-[1fr,200px] gap-3">
            {/* Table */}
            <BudgetTable />

            {/* Side Charts */}
            <div className="space-y-3">
              <InvestmentDonut />
              
              {/* Summary Box */}
              <div className="rounded-lg border border-border bg-muted/30 p-4 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  Resum Inversions
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Acumulat:</span>
                    <span className="text-xs font-mono font-medium text-foreground">
                      {formatCurrency(totals.inversions.acumulat)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Previst:</span>
                    <span className="text-xs font-mono font-medium text-foreground">
                      {formatCurrency(totals.inversions.previst)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground">Execució:</span>
                      <span className="text-xs font-mono font-semibold text-primary">
                        {((totals.inversions.acumulat / totals.inversions.previst) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer notes */}
          <div className="border-t border-border pt-4 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <p>Font: Control de Gestió - Novembre 2025</p>
              <p>Xifres en € | Separador de milers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
