import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus, Edit } from 'lucide-react';
import { Patient } from '@/components/pep/PatientHeader';
import problemsData from '@/data/problems.json';

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
  const [problems, setProblems] = useState<Problem[]>([]);
  
  useEffect(() => {
    setProblems(problemsData.problems);
  }, [patient.id]); 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Problemas e Diagnósticos</CardTitle>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input 
              placeholder="Buscar problema ou diagnóstico" 
              className="w-[300px]" 
            />
            <Button 
              variant="outline" 
              className="gap-1"
            >
              <Filter size={16} /> Filtrar
            </Button>
          </div>
          <Button 
            className="gap-1"
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