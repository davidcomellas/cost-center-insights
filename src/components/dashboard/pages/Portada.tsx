import { Plane } from "lucide-react";

const Portada = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0ms" }}>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
          <Plane className="h-12 w-12 text-primary" />
        </div>
      </div>

      <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Seguiment Econòmic
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <p className="text-xl text-muted-foreground font-medium">
          Aeroports de Catalunya
        </p>
        <p className="text-3xl font-semibold text-primary">2025</p>
      </div>

      <div className="pt-8 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <div className="grid grid-cols-4 gap-6 text-center">
          {[
            { label: "Lleida", code: "LEDA" },
            { label: "La Seu", code: "LESU" },
            { label: "Cerdanya", code: "LECD" },
            { label: "Girona", code: "LEGE" },
          ].map((aeroport, index) => (
            <div
              key={aeroport.code}
              className="p-4 rounded-lg bg-muted/50 border border-border"
            >
              <p className="text-xs text-muted-foreground">{aeroport.code}</p>
              <p className="text-sm font-medium text-foreground">{aeroport.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
        <p className="text-sm text-muted-foreground">
          Període: Novembre 2025
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Useu les fletxes per navegar entre pàgines
        </p>
      </div>
    </div>
  );
};

export default Portada;
