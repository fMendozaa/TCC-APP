
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Language() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('fastion-language') || 'pt-BR';
  });
  const [selectedRegion, setSelectedRegion] = useState(() => {
    return localStorage.getItem('fastion-region') || 'BR';
  });

  const languages = [
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷', available: true },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸', available: false },
    { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸', available: false },
    { code: 'fr-FR', name: 'Français (France)', flag: '🇫🇷', available: false },
    { code: 'it-IT', name: 'Italiano (Italia)', flag: '🇮🇹', available: false },
    { code: 'de-DE', name: 'Deutsch (Deutschland)', flag: '🇩🇪', available: false }
  ];

  const regions = [
    { code: 'BR', name: 'Brasil', flag: '🇧🇷', currency: 'Real (R$)', available: true },
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'Dollar ($)', available: false },
    { code: 'ES', name: 'España', flag: '🇪🇸', currency: 'Euro (€)', available: false },
    { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'Euro (€)', available: false },
    { code: 'IT', name: 'Italia', flag: '🇮🇹', currency: 'Euro (€)', available: false },
    { code: 'DE', name: 'Deutschland', flag: '🇩🇪', currency: 'Euro (€)', available: false }
  ];

  const handleLanguageChange = (langCode: string) => {
    if (!languages.find(l => l.code === langCode)?.available) {
      toast({
        title: "Em breve! 🚀",
        description: "Este idioma será disponibilizado em uma próxima atualização",
      });
      return;
    }

    setSelectedLanguage(langCode);
    localStorage.setItem('fastion-language', langCode);
    toast({
      title: "Idioma alterado! ✅",
      description: `Idioma definido para ${languages.find(l => l.code === langCode)?.name}`,
    });
  };

  const handleRegionChange = (regionCode: string) => {
    if (!regions.find(r => r.code === regionCode)?.available) {
      toast({
        title: "Em breve! 🚀",
        description: "Esta região será disponibilizada em uma próxima atualização",
      });
      return;
    }

    setSelectedRegion(regionCode);
    localStorage.setItem('fastion-region', regionCode);
    toast({
      title: "Região alterada! ✅",
      description: `Região definida para ${regions.find(r => r.code === regionCode)?.name}`,
    });
  };

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
          <h1 className="text-2xl font-bold">Idioma e Região</h1>
        </div>
        <p className="text-white/90">Personalize sua experiência</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Settings */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Configurações Atuais</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-foreground">
              <span className="font-medium">Idioma:</span> {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
            </p>
            <p className="text-foreground">
              <span className="font-medium">Região:</span> {regions.find(r => r.code === selectedRegion)?.flag} {regions.find(r => r.code === selectedRegion)?.name}
            </p>
            <p className="text-muted-foreground text-sm">
              Moeda: {regions.find(r => r.code === selectedRegion)?.currency}
            </p>
          </div>
        </Card>

        {/* Language Selection */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Selecionar Idioma</h3>
          
          <div className="space-y-2">
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedLanguage === language.code
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted/10'
                } ${!language.available ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <p className="font-medium text-foreground">{language.name}</p>
                    {!language.available && (
                      <p className="text-xs text-muted-foreground">Em breve</p>
                    )}
                  </div>
                </div>
                
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Region Selection */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Selecionar Região</h3>
          
          <div className="space-y-2">
            {regions.map((region) => (
              <div
                key={region.code}
                onClick={() => handleRegionChange(region.code)}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRegion === region.code
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted/10'
                } ${!region.available ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{region.flag}</span>
                  <div>
                    <p className="font-medium text-foreground">{region.name}</p>
                    <p className="text-sm text-muted-foreground">{region.currency}</p>
                    {!region.available && (
                      <p className="text-xs text-muted-foreground">Em breve</p>
                    )}
                  </div>
                </div>
                
                {selectedRegion === region.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="p-4 bg-gradient-card shadow-card border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            💡 Novos idiomas e regiões são adicionados regularmente. 
            Mantenha o app atualizado para receber as novidades!
          </p>
        </Card>
      </div>
    </div>
  );
}
