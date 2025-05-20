import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Home,
  Pill,
  User,
  Users,
  FileX,
  Bell,
  ChartBar,
  LogOut,
  HelpCircle,
  Settings,
  UserCircle,
  UserCog,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isActive }: SidebarItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1 font-medium text-white rounded-lg px-4 py-2 gap-3 transition-all hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white",
        isActive && "bg-white/20 text-white font-bold shadow"
      )}
    >
      <Icon className="mr-2 h-5 w-5 text-white" />
      {label}
    </Button>
  </Link>
);

const DashboardSidebar = () => {
  const pathname = window.location.pathname;

  return (
    <aside className="w-64 h-full min-h-screen bg-[#004AAD] flex flex-col shadow-2xl">
      <div className="flex flex-col items-center py-8 mb-6 border-b border-blue-500">
        <img src="/logo.png" alt="Municiti Logo" className="w-full h-auto p-2 mb-1" />
      </div>
      <nav className="flex-1 px-4">
        <p className="text-xs uppercase text-blue-200 font-semibold mb-2 mt-2 px-2 tracking-wider">Menu</p>
        <SidebarItem icon={Home} label="Painel Principal" to="/painel" isActive={pathname === "/painel"} />
        <SidebarItem icon={User} label="Pacientes" to="/pacientes" isActive={pathname === "/pacientes"} />
        <SidebarItem icon={Users} label="Profissionais" to="/profissionais" isActive={pathname === "/profissionais"} />
        <SidebarItem 
          icon={Building2} 
          label="Estabelecimentos" 
          to="/estabelecimentos" 
          isActive={pathname.startsWith("/estabelecimentos")} 
        />
        <SidebarItem icon={Calendar} label="Agenda por Especialidade" to="/agenda" isActive={pathname === "/agenda"} />
        <SidebarItem icon={Clock} label="Painel do Agendador" to="/painel-agendador" isActive={pathname === "/painel-agendador"} />
        <SidebarItem icon={UserCog} label="Fila de Atendimento" to="/fila-atendimento" isActive={pathname === "/fila-atendimento"} />
        <SidebarItem icon={FileText} label="PEP Longitudinal" to="/pep" isActive={pathname === "/pep"} />
        <SidebarItem icon={Pill} label="Prescrição Digital" to="/prescricao" isActive={pathname === "/prescricao"} />
        <SidebarItem icon={FileX} label="Controle de Estoque" to="/estoque" isActive={pathname === "/estoque"} />
        <SidebarItem icon={FileX} label="Geração de Arquivos SUS" to="/arquivos-sus" isActive={pathname === "/arquivos-sus"} />
        <SidebarItem icon={Bell} label="Vacinação e Notificações" to="/vacinacao" isActive={pathname === "/vacinacao"} />
        <SidebarItem icon={ChartBar} label="Painel de Indicadores" to="/indicadores" isActive={pathname === "/indicadores"} />
      </nav>
      <div className="mt-auto px-4 pb-8">
        <div className="border-t border-blue-900 pt-6">
          <p className="text-xs uppercase text-blue-200 font-semibold mb-2 px-2 tracking-wider">Suporte</p>
          <SidebarItem icon={UserCircle} label="Meus Dados" to="/meus-dados" isActive={pathname === "/meus-dados"} />
          <SidebarItem icon={HelpCircle} label="Ajuda" to="/ajuda" isActive={pathname === "/ajuda"} />
          <SidebarItem icon={Settings} label="Configurações" to="/configuracoes" isActive={pathname === "/configuracoes"} />
          <SidebarItem icon={LogOut} label="Sair" to="/login" isActive={false} />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
