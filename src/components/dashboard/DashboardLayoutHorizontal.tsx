import { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutHorizontalProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  pageNumber: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

const DashboardLayoutHorizontal = ({
  children,
  title,
  subtitle,
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
}: DashboardLayoutHorizontalProps) => {
  return (
    <div className="min-h-screen bg-background print:bg-card flex items-center justify-center p-4">
      {/* A4 Landscape Page Container */}
      <div className="w-[297mm] h-[210mm] bg-card shadow-xl print:shadow-none flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-primary px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-primary-foreground/70 uppercase tracking-widest">
                Seguiment Econòmic - Aeroports de Catalunya
              </p>
              <h1 className="text-lg font-bold text-primary-foreground">{title}</h1>
              {subtitle && (
                <p className="text-xs text-primary-foreground/80 mt-0.5">{subtitle}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-primary-foreground/70 uppercase">Període</p>
              <p className="text-sm font-semibold text-primary-foreground">Novembre 2025</p>
              <p className="text-[10px] text-primary-foreground/60 mt-1">
                Pàgina {pageNumber} de {totalPages}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-5 overflow-auto">{children}</div>

        {/* Footer with navigation */}
        <footer className="border-t border-border px-6 py-2 flex items-center justify-between flex-shrink-0 print:hidden">
          <div className="text-[9px] text-muted-foreground">
            Font: Control de Gestió - Novembre 2025
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              disabled={pageNumber === 0}
              className={cn(
                "p-1.5 rounded-md border border-border transition-colors",
                pageNumber === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-muted cursor-pointer"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground min-w-[60px] text-center">
              {pageNumber} / {totalPages}
            </span>
            <button
              onClick={onNext}
              disabled={pageNumber === totalPages}
              className={cn(
                "p-1.5 rounded-md border border-border transition-colors",
                pageNumber === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-muted cursor-pointer"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="text-[9px] text-muted-foreground">Xifres en € | Separador de milers</div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayoutHorizontal;
