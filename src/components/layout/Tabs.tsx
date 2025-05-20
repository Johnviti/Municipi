import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  FileText,
  Activity,
  Ruler,
  Pill,
  FileSearch,
  File,
  Syringe,
  AlertTriangle,
  Skull,
  ClipboardList
} from "lucide-react";

interface PEPTabsProps {
  activeTab: string;
}

export function TabsListComponent({ activeTab }: PEPTabsProps) {
  const tabs = [
    { id: "timeline", label: "Histórico", icon: Calendar },
    { id: "anamnesis", label: "Anamnese", icon: ClipboardList },
    { id: "problems", label: "Problemas", icon: FileText },
    { id: "vitals", label: "Sinais Vitais", icon: Activity },
    { id: "anthropometrics", label: "Antropometria", icon: Ruler },
    { id: "prescription", label: "Prescrição", icon: Pill },
    { id: "exams", label: "Exames", icon: FileSearch },
    { id: "documents", label: "Documentos", icon: File },
    { id: "vaccines", label: "Imunizações", icon: Syringe },
    { id: "allergies", label: "Alergias", icon: AlertTriangle },
    { id: "death", label: "Óbito", icon: Skull },
  ];

  return (
    <TabsList className="grid grid-cols-11 h-auto bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={`flex flex-col items-center py-2 px-1 gap-1 ${
              activeTab === tab.id ? "data-[state=active]:bg-white shadow-sm" : ""
            }`}
          >
            <Icon className={`h-4 w-4 ${activeTab === tab.id ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">{tab.label}</span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}