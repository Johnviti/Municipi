import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

export interface PatientAllergy {
  name: string;
  severity: string;
  reaction: string;
}

export interface PatientDiagnosis {
  name: string;
  code: string;
  codeType: string;
}

export interface Patient {
  id: string;
  name: string;
  recordNumber: string;
  gender: string;
  age: number;
  birthDate: string;
  cpf: string;
  cns: string;
  phone: string;
  email: string;
  diagnoses: PatientDiagnosis[];
  allergies: PatientAllergy[];
  photoUrl?: string | null;
}

interface PatientHeaderProps {
  patient: Patient;
  onPhotoClick?: () => void;
}

export function PatientHeader({ patient, onPhotoClick }: PatientHeaderProps) {
  return (
    <Card className="w-full border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative min-w-[100px] h-[100px] rounded-md overflow-hidden border">
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
              {patient.photoUrl ? (
                <img 
                  src={patient.photoUrl} 
                  alt={patient.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute bottom-0 right-0 h-6 w-6 p-0 bg-background/80 backdrop-blur-sm"
              title="Ver histórico de fotos"
              onClick={onPhotoClick}
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <div className="col-span-full">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{patient.name}</h2>
                <Badge variant="outline" className="ml-2">Prontuário: {patient.recordNumber}</Badge>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Sexo / Idade</span>
              <p>{patient.gender}, {patient.age} anos ({patient.birthDate})</p>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">CPF / CNS</span>
              <p>{patient.cpf} / {patient.cns}</p>
            </div>
            
            <div className="lg:col-span-1 md:col-span-2">
              <span className="text-sm text-muted-foreground">Contato</span>
              <p>{patient.phone} / {patient.email}</p>
            </div>
            
            <div className="col-span-full mt-2">
              <div className="flex flex-wrap gap-2">
                {patient.diagnoses && patient.diagnoses.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground mr-2">Diagnósticos ativos:</span>
                    {patient.diagnoses.map((diagnosis, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className={`cursor-help ${index > 0 ? 'ml-1' : ''}`} 
                        title={`${diagnosis.code} - ${diagnosis.codeType}`}
                      >
                        {diagnosis.name}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {patient.allergies && patient.allergies.length > 0 && (
                  <div className="ml-auto">
                    <span className="text-sm text-muted-foreground mr-2">Alergias:</span>
                    {patient.allergies.map((allergy, index) => (
                      <Badge 
                        key={index}
                        variant="destructive" 
                        className={`cursor-help ${index > 0 ? 'ml-1' : ''}`} 
                        title={`Reação ${allergy.severity} - ${allergy.reaction}`}
                      >
                        {allergy.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}