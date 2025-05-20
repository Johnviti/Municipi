import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal";
import { PatientDiagnosis } from "@/components/pep/PatientHeader";
import diagnosisCodes from "@/data/diagnosisCodes.json";

interface ProblemModalProps {
  onAddProblem?: (problem: PatientDiagnosis) => void;
  onEditProblem?: (problem: PatientDiagnosis, id: string) => void;
  problem?: PatientDiagnosis;
  problemId?: string;
}

// Modal para adicionar um novo problema
export const AddProblemModal = ({ onAddProblem }: ProblemModalProps) => {
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState<PatientDiagnosis>({
    name: "",
    code: "",
    codeType: "CID-10",
    isActive: true,
    notes: "",
    registeredAt: new Date().toLocaleDateString('pt-BR'),
    updatedAt: new Date().toLocaleDateString('pt-BR')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddProblem && problem.name && problem.code) {
      onAddProblem(problem);
      setProblem({ 
        name: "", 
        code: "", 
        codeType: "CID-10",
        isActive: true,
        notes: "",
        registeredAt: new Date().toLocaleDateString('pt-BR'),
        updatedAt: new Date().toLocaleDateString('pt-BR')
      });
      setOpen(false);
    }
  };

  // Atualiza o nome do problema quando o código é selecionado
  useEffect(() => {
    if (problem.code && problem.codeType) {
      const codeList = problem.codeType === "CID-10" ? diagnosisCodes.cid10 : diagnosisCodes.ciap2;
      const selectedDiagnosis = codeList.find(item => item.code === problem.code);
      if (selectedDiagnosis) {
        setProblem(prev => ({ ...prev, name: selectedDiagnosis.name }));
      }
    }
  }, [problem.code, problem.codeType]);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Adicionar Problema
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Adicionar Novo Problema</ModalTitle>
            <ModalDescription>
              Preencha os dados do problema ou diagnóstico do paciente.
            </ModalDescription>
          </ModalHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codeType" className="text-right">
                Tipo
              </Label>
              <Select
                value={problem.codeType}
                onValueChange={(value) => setProblem({ ...problem, codeType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de código" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CID-10">CID-10</SelectItem>
                  <SelectItem value="CIAP-2">CIAP-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Select
                value={problem.code}
                onValueChange={(value) => setProblem({ ...problem, code: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o código" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {problem.codeType === "CID-10" ? (
                    diagnosisCodes.cid10.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} - {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    diagnosisCodes.ciap2.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} - {item.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Problema
              </Label>
              <Input
                id="name"
                value={problem.name}
                onChange={(e) => setProblem({ ...problem, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Observações
              </Label>
              <Textarea
                id="notes"
                value={problem.notes}
                onChange={(e) => setProblem({ ...problem, notes: e.target.value })}
                className="col-span-3"
                placeholder="Observações sobre o problema"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
                <Checkbox 
                  id="active" 
                  checked={problem.isActive}
                  onCheckedChange={(checked) => 
                    setProblem({ ...problem, isActive: checked === true })
                  }
                />
                <Label htmlFor="active">Problema ativo</Label>
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

// Modal para editar um problema existente
export const EditProblemModal = ({ onEditProblem, problem, problemId }: ProblemModalProps) => {
  const [open, setOpen] = useState(false);
  const [editedProblem, setEditedProblem] = useState<PatientDiagnosis>(
    problem || { 
      name: "", 
      code: "", 
      codeType: "CID-10",
      isActive: true,
      notes: "",
      registeredAt: new Date().toLocaleDateString('pt-BR'),
      updatedAt: new Date().toLocaleDateString('pt-BR')
    }
  );

  useEffect(() => {
    if (problem) {
      setEditedProblem(problem);
    }
  }, [problem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEditProblem && problemId && editedProblem.name && editedProblem.code) {
      // Atualiza a data de atualização
      const updatedProblem = {
        ...editedProblem,
        updatedAt: new Date().toLocaleDateString('pt-BR')
      };
      onEditProblem(updatedProblem, problemId);
      setOpen(false);
    }
  };

  // Atualiza o nome do problema quando o código é selecionado
  useEffect(() => {
    if (editedProblem.code && editedProblem.codeType) {
      const codeList = editedProblem.codeType === "CID-10" ? diagnosisCodes.cid10 : diagnosisCodes.ciap2;
      const selectedDiagnosis = codeList.find(item => item.code === editedProblem.code);
      if (selectedDiagnosis) {
        setEditedProblem(prev => ({ ...prev, name: selectedDiagnosis.name }));
      }
    }
  }, [editedProblem.code, editedProblem.codeType]);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="ghost" size="sm">
          Editar
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Editar Problema</ModalTitle>
            <ModalDescription>
              Atualize os dados do problema ou diagnóstico do paciente.
            </ModalDescription>
          </ModalHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-codeType" className="text-right">
                Tipo
              </Label>
              <Select
                value={editedProblem.codeType}
                onValueChange={(value) => setEditedProblem({ ...editedProblem, codeType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de código" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CID-10">CID-10</SelectItem>
                  <SelectItem value="CIAP-2">CIAP-2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Código
              </Label>
              <Select
                value={editedProblem.code}
                onValueChange={(value) => setEditedProblem({ ...editedProblem, code: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o código" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {editedProblem.codeType === "CID-10" ? (
                    diagnosisCodes.cid10.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} - {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    diagnosisCodes.ciap2.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} - {item.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Problema
              </Label>
              <Input
                id="edit-name"
                value={editedProblem.name}
                onChange={(e) => setEditedProblem({ ...editedProblem, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">
                Observações
              </Label>
              <Textarea
                id="edit-notes"
                value={editedProblem.notes}
                onChange={(e) => setEditedProblem({ ...editedProblem, notes: e.target.value })}
                className="col-span-3"
                placeholder="Observações sobre o problema"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
                <Checkbox 
                  id="edit-active" 
                  checked={editedProblem.isActive}
                  onCheckedChange={(checked) => 
                    setEditedProblem({ ...editedProblem, isActive: checked === true })
                  }
                />
                <Label htmlFor="edit-active">Problema ativo</Label>
              </div>
            </div>
            {editedProblem.registeredAt && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs text-muted-foreground">
                  Registrado em
                </Label>
                <span className="col-span-3 text-xs text-muted-foreground">
                  {editedProblem.registeredAt}
                </span>
              </div>
            )}
          </div>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

// Modal para buscar problemas
export const SearchProblemModal = ({ onAddProblem }: ProblemModalProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PatientDiagnosis[]>([]);
  const [codeType, setCodeType] = useState<string>("CID-10");


  const handleSelectProblem = (problem: PatientDiagnosis) => {
    if (onAddProblem) {
      onAddProblem(problem);
      setOpen(false);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" /> Buscar Problema
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[600px]">
        <ModalHeader>
          <ModalTitle>Buscar Problema</ModalTitle>
          <ModalDescription>
            Pesquise por nome ou código para encontrar um problema.
          </ModalDescription>
        </ModalHeader>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Select
              value={codeType}
              onValueChange={setCodeType}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo de código" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CID-10">CID-10</SelectItem>
                <SelectItem value="CIAP-2">CIAP-2</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Digite o nome ou código do problema"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="button">
              Buscar
            </Button>
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto border rounded-md">
          {searchResults.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="text-left p-2">Problema</th>
                  <th className="text-left p-2">Código</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result, index) => (
                  <tr key={index} className="border-t hover:bg-muted/50">
                    <td className="p-2">{result.name}</td>
                    <td className="p-2">{result.code}</td>
                    <td className="p-2">{result.codeType}</td>
                    <td className="p-2 text-right">
                      <Button
                        size="sm"
                        onClick={() => handleSelectProblem(result)}
                      >
                        Selecionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : searchTerm ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum resultado encontrado para "{searchTerm}"
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Digite um termo para buscar problemas
            </div>
          )}
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};