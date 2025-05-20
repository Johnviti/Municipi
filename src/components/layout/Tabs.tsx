import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Stethoscope, 
  Activity, 
  Ruler, 
  TestTube,
  FileCheck, 
  Syringe, 
  AlertTriangle, 
  FileX
} from 'lucide-react';

interface PEPTabsProps {
  activeTab: string;
}

export function TabsListComponent({ activeTab }: PEPTabsProps) {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-11 h-auto">
      <TabsTrigger value="timeline" className="flex items-center gap-1">
        <Calendar size={16} /> Histórico
      </TabsTrigger>
      <TabsTrigger value="anamnesis" className="flex items-center gap-1">
        <FileText size={16} /> Anamnese
      </TabsTrigger>
      <TabsTrigger value="problems" className="flex items-center gap-1">
        <Stethoscope size={16} /> Problemas
      </TabsTrigger>
      <TabsTrigger value="vitals" className="flex items-center gap-1">
        <Activity size={16} /> Sinais Vitais
      </TabsTrigger>
      <TabsTrigger value="anthropometrics" className="flex items-center gap-1">
        <Ruler size={16} /> Antropometria
      </TabsTrigger>
      <TabsTrigger value="prescription" className="flex items-center gap-1">
        <Pill size={16} /> Prescrição
      </TabsTrigger>
      <TabsTrigger value="exams" className="flex items-center gap-1">
        <TestTube size={16} /> Exames
      </TabsTrigger>
      <TabsTrigger value="documents" className="flex items-center gap-1">
        <FileCheck size={16} /> Documentos
      </TabsTrigger>
      <TabsTrigger value="vaccines" className="flex items-center gap-1">
        <Syringe size={16} /> Imunizações
      </TabsTrigger>
      <TabsTrigger value="allergies" className="flex items-center gap-1">
        <AlertTriangle size={16} /> Alergias
      </TabsTrigger>
      <TabsTrigger value="death" className="flex items-center gap-1">
        <FileX size={16} /> Óbito
      </TabsTrigger>
    </TabsList>
  );
}