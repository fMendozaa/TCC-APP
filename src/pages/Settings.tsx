import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  ArrowLeft, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Volume2, 
  Smartphone,
  CreditCard,
  User,
  Lock,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    soundEffects: true,
    biometricAuth: false,
    autoSave: true,
    marketingEmails: false,
    language: 'pt-BR'
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Configuração atualizada! ✅",
      description: "Suas preferências foram salvas",
    });
  };

  const settingsGroups = [
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { key: "notifications", label: "Notificações push", value: settings.notifications },
        { key: "marketingEmails", label: "Emails promocionais", value: settings.marketingEmails }
      ]
    },
    {
      title: "Aparência",
      icon: Moon,
      items: [
        { key: "darkMode", label: "Modo escuro", value: settings.darkMode }
      ]
    },
    {
      title: "Som e Vibração",
      icon: Volume2,
      items: [
        { key: "soundEffects", label: "Efeitos sonoros", value: settings.soundEffects }
      ]
    },
    {
      title: "Segurança",
      icon: Shield,
      items: [
        { key: "biometricAuth", label: "Autenticação biométrica", value: settings.biometricAuth },
        { key: "autoSave", label: "Salvamento automático", value: settings.autoSave }
      ]
    }
  ];

  const menuItems = [
    { icon: User, label: "Informações da Conta", action: () => navigate('/account') },
    { icon: CreditCard, label: "Métodos de Pagamento", action: () => console.log('Payment methods') },
    { icon: Lock, label: "Privacidade", action: () => console.log('Privacy') },
    { icon: Globe, label: "Idioma e Região", action: () => console.log('Language') },
    { icon: HelpCircle, label: "Ajuda e Suporte", action: () => console.log('Help') },
    { icon: LogOut, label: "Sair da Conta", action: () => console.log('Logout'), danger: true }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/account')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Configurações</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar configurações..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="p-6 bg-gradient-card shadow-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <group.icon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
            </div>
            
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <Label htmlFor={item.key} className="text-foreground font-medium cursor-pointer">
                    {item.label}
                  </Label>
                  <Switch 
                    id={item.key}
                    checked={item.value}
                    onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Menu Items */}
        <Card className="p-0 bg-gradient-card shadow-card border-border/50 overflow-hidden">
          <div className="space-y-0">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div 
                  onClick={item.action}
                  className={`flex items-center gap-4 p-4 hover:bg-muted/10 transition-colors cursor-pointer ${
                    item.danger ? 'hover:bg-red-500/10' : ''
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${item.danger ? 'text-red-500' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                </div>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">TRENDFY</h3>
          <p className="text-muted-foreground text-sm mb-1">Versão 1.0.0</p>
          <p className="text-muted-foreground text-xs">© 2024 TRENDFY. Todos os direitos reservados.</p>
        </Card>
      </div>
    </div>
  );
}