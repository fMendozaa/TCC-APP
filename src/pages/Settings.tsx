
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  ArrowLeft, 
  Bell, 
  Shield, 
  Moon, 
  Sun,
  Globe, 
  Volume2, 
  CreditCard,
  User,
  Lock,
  HelpCircle,
  LogOut,
  Palette,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const colorThemes = [
  { 
    id: 'default', 
    name: 'FASTION Original', 
    primary: 'hsl(270, 85%, 60%)',
    secondary: 'hsl(290, 80%, 65%)'
  },
  { 
    id: 'ocean', 
    name: 'Ocean Blue', 
    primary: 'hsl(210, 100%, 65%)',
    secondary: 'hsl(185, 80%, 60%)'
  },
  { 
    id: 'sunset', 
    name: 'Sunset Orange', 
    primary: 'hsl(15, 100%, 60%)',
    secondary: 'hsl(45, 100%, 65%)'
  },
  { 
    id: 'forest', 
    name: 'Forest Green', 
    primary: 'hsl(140, 70%, 45%)',
    secondary: 'hsl(125, 65%, 55%)'
  },
  { 
    id: 'royal', 
    name: 'Royal Purple', 
    primary: 'hsl(270, 85%, 65%)',
    secondary: 'hsl(245, 75%, 65%)'
  }
];

export function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('fastion-settings');
    return saved ? JSON.parse(saved) : {
      notifications: true,
      darkMode: true,
      soundEffects: true,
      biometricAuth: false,
      autoSave: true,
      marketingEmails: false,
      language: 'pt-BR',
      colorTheme: 'default'
    };
  });

  // Apply theme on component mount
  useEffect(() => {
    applyTheme(settings.colorTheme);
    applyDarkMode(settings.darkMode);
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`);
      root.style.setProperty('--gradient-accent', `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`);
    }
  };

  const applyDarkMode = (isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('fastion-settings', JSON.stringify(newSettings));
    
    if (key === 'colorTheme') {
      applyTheme(value as string);
      const theme = colorThemes.find(t => t.id === value);
      toast({
        title: "Tema atualizado! ✅",
        description: `Tema ${theme?.name} aplicado`,
      });
    } else if (key === 'darkMode') {
      applyDarkMode(value as boolean);
      toast({
        title: "Modo de exibição alterado! ✅",
        description: value ? "Modo escuro ativado" : "Modo claro ativado",
      });
    } else {
      toast({
        title: "Configuração atualizada! ✅",
        description: "Suas preferências foram salvas",
      });
    }
  };

  const settingsGroups = [
    {
      title: "Aparência",
      icon: Palette,
      items: [
        { 
          key: "darkMode", 
          label: "Modo escuro", 
          value: settings.darkMode, 
          type: "switch" as const,
          icon: settings.darkMode ? Moon : Sun
        },
        { 
          key: "colorTheme", 
          label: "Tema de cores", 
          value: settings.colorTheme, 
          type: "select" as const,
          options: colorThemes
        }
      ]
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { key: "notifications", label: "Notificações push", value: settings.notifications, type: "switch" as const },
        { key: "marketingEmails", label: "Emails promocionais", value: settings.marketingEmails, type: "switch" as const }
      ]
    },
    {
      title: "Som e Vibração",
      icon: Volume2,
      items: [
        { key: "soundEffects", label: "Efeitos sonoros", value: settings.soundEffects, type: "switch" as const }
      ]
    },
    {
      title: "Segurança",
      icon: Shield,
      items: [
        { key: "biometricAuth", label: "Autenticação biométrica", value: settings.biometricAuth, type: "switch" as const },
        { key: "autoSave", label: "Salvamento automático", value: settings.autoSave, type: "switch" as const }
      ]
    }
  ];

  const menuItems = [
    { icon: User, label: "Informações da Conta", action: () => navigate('/account') },
    { icon: CreditCard, label: "Métodos de Pagamento", action: () => toast({ title: "Em breve!", description: "Funcionalidade sendo desenvolvida" }) },
    { icon: Lock, label: "Privacidade", action: () => toast({ title: "Configurações de privacidade", description: "Suas informações estão protegidas" }) },
    { icon: Globe, label: "Idioma e Região", action: () => navigate('/language') },
    { icon: HelpCircle, label: "Ajuda e Suporte", action: () => navigate('/support') },
    { icon: LogOut, label: "Sair da Conta", action: () => toast({ title: "Logout realizado", description: "Até logo!" }), danger: true }
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
          <Card key={groupIndex} className="p-6 bg-card shadow-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <group.icon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">{group.title}</h3>
            </div>
            
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4 text-muted-foreground" />}
                    <Label htmlFor={item.key} className="text-card-foreground font-medium cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                  
                  {item.type === "switch" ? (
                    <Switch 
                      id={item.key}
                      checked={item.value as boolean}
                      onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                  ) : (
                    <Select value={item.value as string} onValueChange={(value) => handleSettingChange(item.key, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options?.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded"
                                style={{
                                  background: `linear-gradient(135deg, ${option.primary}, ${option.secondary})`
                                }}
                              ></div>
                              {option.name}
                              {settings.colorTheme === option.id && <Check className="w-4 h-4 text-primary ml-2" />}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Menu Items */}
        <Card className="p-0 bg-card shadow-card border-border/50 overflow-hidden">
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
                  <span className={`font-medium ${item.danger ? 'text-red-500' : 'text-card-foreground'}`}>
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
        <Card className="p-6 bg-card shadow-card border-border/50 text-center">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">FASTION</h3>
          <p className="text-muted-foreground text-sm mb-1">Versão 1.0.0</p>
          <p className="text-muted-foreground text-xs">© 2025 FASTION. Todos os direitos reservados.</p>
        </Card>
      </div>
    </div>
  );
}
