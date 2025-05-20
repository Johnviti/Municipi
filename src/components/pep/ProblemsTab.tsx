import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus, Edit } from 'lucide-react';
import { Patient } from '@/components/pep/PatientHeader';

interface Problem {
  id: string;
  name: string;
  code: string;
  codeType: string;
  status: string;
  startDate: string;
  confirmation: string;
}

interface ProblemsTabProps {
  patient: Patient;
}

export function ProblemsTab({ patient }: ProblemsTabProps) {
  // In a real app, you would fetch problems from an API
  // For now, we'll use the patient's diagnoses as a starting point
  const problems: Problem[] = patient.diagnoses.map((diagnosis, index) => ({
    id: `problem-${index}`,
    name: diagnosis.name,
    code: diagnosis.code,
    codeType: diagnosis.codeType,
    status: "Crônico (Ativo)",
    startDate: index === 0 ? "10/05/2020" : "15/03/2021",
    confirmation: "Confirmado"
  }));

  const handleAddProblem = () => {
    console.log("Add new problem");
    // In a real app, you would open a modal or navigate to a form
  };

  const handleEditProblem = (problemId: string) => {
    console.log("Edit problem", problemId);
    // In a real app, you would open a modal or navigate to a form
  };

  const handleFilterProblems = () => {
    console.log("Filter problems");
    // In a real app, you would implement filtering logic
  };

  const handleSearchProblems = (searchTerm: string) => {
    console.log("Search problems", searchTerm);
    // In a real app, you would implement search logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Problemas e Diagnósticos</CardTitle>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input 
              placeholder="Buscar problema ou diagnóstico" 
              className="w-[300px]" 
              onChange={(e) => handleSearchProblems(e.target.value)}
            />
            <Button 
              variant="outline" 
              className="gap-1"
              onClick={handleFilterProblems}
            >
              <Filter size={16} /> Filtrar
            </Button>
          </div>
          <Button 
            className="gap-1"
            onClick={handleAddProblem}
          >
            <Plus size={16} /> Adicionar Problema
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Problema/Diagnóstico</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Início</TableHead>
              <TableHead>Confirmação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.name}</TableCell>
                <TableCell>{problem.code}</TableCell>
                <TableCell>{problem.codeType}</TableCell>
                <TableCell>
                  <Badge>{problem.status}</Badge>
                </TableCell>
                <TableCell>{problem.startDate}</TableCell>
                <TableCell>{problem.confirmation}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditProblem(problem.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}