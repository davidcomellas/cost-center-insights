import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant?: "default" | "positive" | "negative";
  delay?: number;
}

const KPICard = ({ title, value, icon, variant = "default", delay = 0 }: KPICardProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    positive: "bg-card border-success/30",
    negative: "bg-card border-destructive/30",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    positive: "bg-success/10 text-success",
    negative: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-sm opacity-0 animate-fade-in",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          <p className="mt-1 text-xl font-semibold text-foreground font-mono">
            {value}
          </p>
        </div>
        <div className={cn("rounded-full p-2.5", iconStyles[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
