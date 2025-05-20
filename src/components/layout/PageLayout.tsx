import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const PageLayout = ({ children, className, title }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-health-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Sistema de Gestão para Saúde</h1>
          <div className="flex items-center space-x-4">
            <span>Usuário: Admin</span>
            <button className="bg-white/20 rounded-md px-3 py-1.5 text-sm hover:bg-white/30 transition-colors">
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-health-dark">{title}</h2>
            <div className="h-1 w-20 bg-health-secondary mt-2"></div>
          </div>
        )}
        
        <main className={cn("", className)}>
          {children}
        </main>
      </div>
      
      <footer className="bg-gray-100 py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © 2025 Sistema de Gestão para Unidades de Saúde - Versão 1.0.0
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
