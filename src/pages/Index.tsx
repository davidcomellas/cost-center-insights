import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Portada from "@/components/dashboard/pages/Portada";
import EvolucioHistorica from "@/components/dashboard/pages/EvolucioHistorica";
import ExecucioPressuposta from "@/components/dashboard/pages/ExecucioPressuposta";
import PressupostCentreCost from "@/components/dashboard/pages/PressupostCentreCost";
import Comercial from "@/components/dashboard/pages/Comercial";

const pages = [
  { title: "Portada", subtitle: "", component: Portada },
  { title: "Evolució Històrica", subtitle: "Anàlisi 2021-2025", component: EvolucioHistorica },
  { title: "Execució Pressupostària", subtitle: "Seguiment mensual", component: ExecucioPressuposta },
  { title: "Pressupost x Centre de Cost", subtitle: "Anàlisi per actiu", component: PressupostCentreCost },
  { title: "Comercial", subtitle: "Despeses i Ingressos per Aeroport", component: Comercial },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const CurrentComponent = pages[currentPage].component;

  return (
    <DashboardLayout
      title={pages[currentPage].title}
      subtitle={pages[currentPage].subtitle}
      pageNumber={currentPage}
      totalPages={pages.length - 1}
      onPrevious={handlePrevious}
      onNext={handleNext}
    >
      <CurrentComponent />
    </DashboardLayout>
  );
};

export default Index;
