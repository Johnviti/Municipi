import { cn } from "@/lib/utils";
import DashboardSidebar from "./DashboardSidebar";
import { Sun, MapPin, Bell, Building, User, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import professionalData from "@/data/professionalData.json";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const DashboardLayout = ({ children, className, title }: DashboardLayoutProps) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  
  const { professional } = professionalData;
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header institucional */}
        <header className="sticky top-0 z-30 bg-white shadow flex items-center justify-between px-8 h-20 border-b border-blue-100">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-gray-700 text-lg font-semibold">Olá, <span className="text-blue-700 font-bold">{professional.name}</span></span>
              <span className="text-sm text-gray-500">{professional.role} - {professional.specialty}</span>
            </div>
            
            {professional.hasMultipleUnits ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-blue-900 font-medium text-sm bg-blue-50 border-blue-100 hover:bg-blue-100"
              >
                <Building className="w-4 h-4" />
                {professional.unit}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            ) : (
              <span className="flex items-center gap-2 text-blue-900 font-medium text-sm bg-blue-50 rounded px-3 py-1">
                <Building className="w-4 h-4" /> 
                {professional.unit}
              </span>
            )}
            
            <span className="flex items-center gap-2 text-blue-900 font-medium text-sm bg-blue-50 rounded px-3 py-1">
              <MapPin className="w-4 h-4" /> 
              {professional.location.city} - {professional.location.state}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-blue-900 font-semibold text-lg">
              <Sun className="w-5 h-5 text-yellow-400" /> {professional.weather.temperature}°C
            </span>
            
            <div className="flex flex-col items-end">
              <span className="text-blue-900 font-semibold text-lg">{time}</span>
              <span className="text-sm text-gray-500">{date}</span>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
            
            <Button variant="ghost" className="relative p-0 h-10 w-10 rounded-full">
              <User className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </header>
        <div className="p-8 flex-1">
          {title && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-1 font-sans">{title}</h2>
              <div className="h-1 w-20 bg-blue-200 rounded"></div>
            </div>
          )}
          <main className={cn("", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
