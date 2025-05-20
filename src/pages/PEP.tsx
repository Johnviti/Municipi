import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { PatientHeader } from "@/components/pep/PatientHeader";
import { ProblemsTab } from "@/components/pep/ProblemsTab";
import { TabsListComponent } from "@/components/layout/Tabs";
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import patientData from "@/data/patientData.json";

export default function PEP() {
  const defaultPatient = patientData.patients[0];
  
  const handlePhotoClick = () => {
    console.log("Editar foto do paciente");
  };

  const [activeTab, setActiveTab] = useState("problems");
  const [currentPatient, setCurrentPatient] = useState(defaultPatient);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <DashboardLayout title="PEP Longitudinal">
      <div className="flex flex-col gap-4">
        <PatientHeader 
          patient={currentPatient}
          onPhotoClick={handlePhotoClick}
        />
         
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
          <TabsListComponent activeTab={activeTab} />

          {/* Histórico de Atendimentos */}
          <TabsContent value="timeline" className="mt-4">
          </TabsContent>

          {/* Anamnese e Evolução */}
          <TabsContent value="anamnesis" className="mt-4">
          </TabsContent>

          {/* Problemas e Diagnósticos */}
          <TabsContent value="problems" className="mt-4">
            <ProblemsTab patient={currentPatient} />
          </TabsContent>

          {/* Sinais Vitais */}
          <TabsContent value="vitals" className="mt-4">
          </TabsContent>

          {/* Antropometria */}
          <TabsContent value="anthropometrics" className="mt-4">
          </TabsContent>

          {/* Prescrição */}
          <TabsContent value="prescription" className="mt-4">
          </TabsContent>

          {/* Exames */}
          <TabsContent value="exams" className="mt-4">
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documents" className="mt-4">
          </TabsContent>

          {/* Imunizações */}
          <TabsContent value="vaccines" className="mt-4">
          </TabsContent>

          {/* Alergias e Intolerâncias */}
          <TabsContent value="allergies" className="mt-4">
          </TabsContent>

          {/* Óbito */}
          <TabsContent value="death" className="mt-4">
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button>Assinar com Certificado Digital</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}