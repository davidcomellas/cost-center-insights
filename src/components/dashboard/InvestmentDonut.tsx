import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { centresCostData, formatCurrency, chartColors } from "@/lib/budgetData";

const InvestmentDonut = () => {
  // Filter centres with investment > 0
  const investmentData = centresCostData
    .filter((c) => c.inversions.previst > 0)
    .map((c, index) => ({
      name: c.nom,
      value: c.inversions.previst,
      color: chartColors[index % chartColors.length],
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md shadow-lg px-3 py-2">
          <p className="text-xs font-medium text-foreground">{payload[0].name}</p>
          <p className="text-xs font-mono text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-col gap-1 mt-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-[10px]">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground truncate">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm p-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
        Inversions Acumulades per Centre
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={investmentData}
              cx="50%"
              cy="45%"
              innerRadius={35}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {investmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestmentDonut;
